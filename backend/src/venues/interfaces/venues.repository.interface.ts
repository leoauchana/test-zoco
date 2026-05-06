import { Venue } from '@prisma/client';
import { CreateVenueDto } from '../dto/create-venues.dto';
import { UpdateVenueDto } from '../dto/update-venues.dto';
export interface IVenuesRepository {
  findAll(page?: number, limit?: number, actives?: boolean): Promise<Venue[]>;
  findCategory(
    category: string,
    page?: number,
    limit?: number,
    actives?: boolean,
  ): Promise<Venue[]>;
  findOne(id: string): Promise<Venue | null>;
  create(data: CreateVenueDto): Promise<Venue>;
  update(id: string, data: UpdateVenueDto): Promise<Venue>;
  softDelete(id: string): Promise<Venue>;
}
