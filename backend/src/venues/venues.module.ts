import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { VenuesMapper } from './mappers/venue.mapper';
import { VENUES_REPOSITORY, VENUES_SERVICE } from './venues.constants';
import { VenuesController } from './venues.controller';
import { VenuesRepository } from './venues.repository';
import { VenuesService } from './venues.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VenuesController],
  providers: [
    VenuesMapper,
    {
      provide: VENUES_SERVICE,
      useClass: VenuesService,
    },
    {
      provide: VENUES_REPOSITORY,
      useClass: VenuesRepository,
    },
  ],
  exports: [VENUES_SERVICE, VENUES_REPOSITORY],
})
export class VenuesModule {}
