import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module';
import { LogsModule } from '../logs/logs.module';
import { VenuesModule } from '../venues/venues.module';
import { SYNC_SERVICE } from './sync.constants';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

@Module({
  controllers: [SyncController],
  providers: [
    {
      provide: SYNC_SERVICE,
      useClass: SyncService,
    },
  ],
  imports: [AiModule, VenuesModule, LogsModule],
})
export class SyncModule {}
