import { CreateVenueDto } from '../dto/create-venues.dto';
import { VenueResponseDto } from '../dto/response-venues.dto';
import { UpdateVenueDto } from '../dto/update-venues.dto';

export interface IVenuesService {
  findAll(
    page?: number,
    limit?: number,
    actives?: boolean,
  ): Promise<{ data: VenueResponseDto[]; total: number }>;

  findOne(id: string): Promise<VenueResponseDto>;

  create(data: CreateVenueDto): Promise<VenueResponseDto>;

  update(id: string, data: UpdateVenueDto): Promise<VenueResponseDto>;

  softDelete(id: string): Promise<VenueResponseDto>;
}
