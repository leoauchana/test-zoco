import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { VenuesMapper } from './mappers/venue.mapper';
import { VenuesController } from './venues.controller';
import { VenuesRepository } from './venues.repository';
import { VenuesService } from './venues.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VenuesController],
  providers: [
    VenuesMapper,
    {
      provide: 'IVenuesService',
      useClass: VenuesService,
    },
    {
      provide: 'IVenuesRepository',
      useClass: VenuesRepository,
    },
  ],
  exports: ['IVenuesService'],
})
export class VenuesModule {}
