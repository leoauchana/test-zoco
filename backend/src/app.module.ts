import { Module } from '@nestjs/common';
import { SyncModule } from './sync/sync.module';
import { VenuesModule } from './venues/venues.module';
@Module({
  imports: [VenuesModule, SyncModule],
})
export class AppModule {}
