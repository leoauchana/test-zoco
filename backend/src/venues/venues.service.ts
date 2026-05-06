import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Venue } from '@prisma/client';
import { CreateVenueDto } from './dto/create-venues.dto';
import { VenueResponseDto } from './dto/response-venues.dto';
import { UpdateVenueDto } from './dto/update-venues.dto';
import type { IVenuesRepository } from './interfaces/venues.repository.interface';
import { IVenuesService } from './interfaces/venues.service.interface';
import { VenuesMapper } from './mappers/venue.mapper';

@Injectable()
export class VenuesService implements IVenuesService {
  constructor(
    @Inject('IVenuesRepository')
    private readonly venuesRepository: IVenuesRepository,
    private readonly venueMapper: VenuesMapper,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    actives?: boolean,
  ): Promise<VenueResponseDto[]> {
    this.validatePagination(page, limit);
    const venues = await this.venuesRepository.findAll(page, limit, actives);
    return this.venueMapper.toPrismaToResponseArray(venues);
  }

  async findByCategory(
    category: string,
    page: number = 1,
    limit: number = 10,
    actives?: boolean,
  ): Promise<VenueResponseDto[]> {
    this.validateCategory(category);
    this.validatePagination(page, limit);

    const venues = await this.venuesRepository.findCategory(
      category,
      page,
      limit,
      actives,
    );

    if (venues.length === 0) {
      throw new NotFoundException(`No venues found in category "${category}"`);
    }

    return this.venueMapper.toPrismaToResponseArray(venues);
  }

  async findOne(id: string): Promise<VenueResponseDto> {
    this.validateId(id);

    const venue = await this.venuesRepository.findOne(id);

    if (!venue) {
      throw new NotFoundException(`Venue with id "${id}" not found`);
    }

    return this.venueMapper.toPrismaToResponse(venue);
  }

  async create(data: CreateVenueDto): Promise<VenueResponseDto> {
    if (!data.name || data.name.trim() === '') {
      throw new BadRequestException('The name of the venue is required');
    }

    const existingVenue = await this.findOneByName(data.name);

    if (existingVenue) {
      throw new ConflictException(
        `A venue with the name "${data.name}" already exists`,
      );
    }

    const venue = await this.venuesRepository.create(data);
    return this.venueMapper.toPrismaToResponse(venue);
  }

  async update(id: string, data: UpdateVenueDto): Promise<VenueResponseDto> {
    this.validateId(id);

    const existingVenue = await this.venuesRepository.findOne(id);

    if (!existingVenue) {
      throw new NotFoundException(`Venue with id "${id}" not found`);
    }

    if (data.name && data.name.trim() !== '') {
      const venueWithName = await this.findOneByName(data.name);

      if (venueWithName && venueWithName.id !== id) {
        throw new ConflictException(
          `A venue with the name "${data.name}" already exists`,
        );
      }
    }

    this.validateUpdateData(data);

    const venue = await this.venuesRepository.update(id, data);
    return this.venueMapper.toPrismaToResponse(venue);
  }

  async softDelete(id: string): Promise<VenueResponseDto> {
    this.validateId(id);

    const existingVenue = await this.venuesRepository.findOne(id);

    if (!existingVenue) {
      throw new NotFoundException(`Venue with id "${id}" not found`);
    }

    if (!existingVenue.active) {
      throw new BadRequestException(
        `The venue "${existingVenue.name}" is already deactivated`,
      );
    }

    const venue = await this.venuesRepository.softDelete(id);
    return this.venueMapper.toPrismaToResponse(venue);
  }

  /**
   * Validar parámetros de paginación
   */
  private validatePagination(page: number, limit: number): void {
    if (page < 1) {
      throw new BadRequestException('The page number must be greater than 0');
    }

    if (limit < 1 || limit > 20) {
      throw new BadRequestException(
        'The limit must be between 1 and 20 records',
      );
    }
  }

  private validateId(id: string): void {
    if (!id || id.trim() === '') {
      throw new BadRequestException('The ID of the venue is required');
    }
  }

  private validateCategory(category: string): void {
    if (!category || category.trim() === '') {
      throw new BadRequestException('The category is required');
    }
  }

  private validateUpdateData(data: UpdateVenueDto): void {
    if (data.name !== undefined && data.name.trim() === '') {
      throw new BadRequestException('The name of the venue cannot be empty');
    }

    if (data.location !== undefined && data.location.trim() === '') {
      throw new BadRequestException('The location cannot be empty');
    }

    if (data.category !== undefined && data.category.trim() === '') {
      throw new BadRequestException('The category cannot be empty');
    }
  }

  private async findOneByName(name: string): Promise<Venue | null> {
    const venues = await this.venuesRepository.findAll();

    return (
      venues.find((v) => v.name.toLowerCase() === name.toLowerCase()) || null
    );
  }
}
