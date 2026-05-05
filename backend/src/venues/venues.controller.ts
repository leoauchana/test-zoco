import { Controller, Inject } from '@nestjs/common';
import type { IVenuesService } from './interfaces/venues.service.interface';

@Controller('venues')
export class VenuesController {
  constructor(
    @Inject('IVenuesService')
    private readonly venuesService: IVenuesService,
  ) {}
}
