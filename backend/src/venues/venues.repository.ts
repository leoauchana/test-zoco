import { Injectable } from '@nestjs/common';
import { Venue } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateVenueDto } from './dto/create-venues.dto';
import { UpdateVenueDto } from './dto/update-venues.dto';
import { IVenuesRepository } from './interfaces/venues.repository.interface';

@Injectable()
export class VenuesRepository implements IVenuesRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  findCategory(
    category: string,
    page?: number,
    limit?: number,
    actives?: boolean,
  ): Promise<Venue[]> {
    return this.databaseService.venue.findMany({
      where: {
        category,
        active: actives !== undefined ? actives : undefined,
      },
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
    });
  }
  async findAll(
    page?: number,
    limit?: number,
    actives?: boolean,
  ): Promise<Venue[]> {
    const venues = await this.databaseService.venue.findMany({
      where: {
        active: actives !== undefined ? actives : undefined,
      },
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
    });
    return venues;
  }
  async findOne(id: string): Promise<Venue | null> {
    const venueFound = await this.databaseService.venue.findUnique({
      where: { id },
    });
    return venueFound;
  }
  async create(data: CreateVenueDto): Promise<Venue> {
    const venue = await this.databaseService.venue.create({ data });
    return venue;
  }
  async update(id: string, data: UpdateVenueDto): Promise<Venue> {
    const venue = await this.databaseService.venue.update({
      where: { id },
      data,
    });
    return venue;
  }
  async softDelete(id: string): Promise<Venue> {
    const venue = await this.databaseService.venue.update({
      where: { id },
      data: { active: false },
    });
    return venue;
  }
}
