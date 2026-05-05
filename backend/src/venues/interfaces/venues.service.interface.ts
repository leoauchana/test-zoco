import { Venue } from '@prisma/client';
import { CreateVenueDto } from '../dto/create-venues.dto';
import { UpdateVenueDto } from '../dto/update-venues.dto';

export interface IVenuesService {
  findAll(): Promise<Venue[]>;
  findOne(id: string): Promise<Venue>;
  create(data: CreateVenueDto): Promise<Venue>;
  update(id: string, data: UpdateVenueDto): Promise<Venue>;
  softDelete(id: string): Promise<Venue>;
}
