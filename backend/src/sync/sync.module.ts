import { Module } from '@nestjs/common';
import { AiModule } from 'src/ai/ai.module';
import { LogsModule } from 'src/logs/logs.module';
import { VenuesModule } from 'src/venues/venues.module';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

@Module({
  controllers: [SyncController],
  providers: [
    {
      provide: 'ISyncService',
      useClass: SyncService,
    },
  ],
  imports: [AiModule, VenuesModule, LogsModule],
})
export class SyncModule {}
