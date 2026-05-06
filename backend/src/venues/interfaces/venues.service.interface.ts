import { CreateVenueDto } from '../dto/create-venues.dto';
import { VenueResponseDto } from '../dto/response-venues.dto';
import { UpdateVenueDto } from '../dto/update-venues.dto';

export interface IVenuesService {
  findByCategory(
    category: string,
    page?: number,
    limit?: number,
  ): Promise<VenueResponseDto[]>;
  findAll(
    page?: number,
    limit?: number,
    actives?: boolean,
  ): Promise<VenueResponseDto[]>;

  findByCategory(
    category: string,
    page?: number,
    limit?: number,
    actives?: boolean,
  ): Promise<VenueResponseDto[]>;

  findOne(id: string): Promise<VenueResponseDto>;

  create(data: CreateVenueDto): Promise<VenueResponseDto>;

  update(id: string, data: UpdateVenueDto): Promise<VenueResponseDto>;

  softDelete(id: string): Promise<VenueResponseDto>;
}
