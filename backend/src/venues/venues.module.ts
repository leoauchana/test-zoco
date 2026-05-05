import { Module } from '@nestjs/common';
import { VenuesController } from './venues.controller';
import { VenuesRepository } from './venues.repository';
import { VenuesService } from './venues.service';

@Module({
  providers: [
    {
      provide: 'IVenuesService',
      useClass: VenuesService,
    },
    {
      provide: 'IVenuesRepository',
      useClass: VenuesRepository,
    },
  ],
  controllers: [VenuesController],
})
export class VenuesModule {}
