import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LOGS_REPOSITORY, LOGS_SERVICE } from './logs.constants';
import { LogsController } from './logs.controller';
import { LogsRepository } from './logs.repository';
import { LogsService } from './logs.service';

@Module({
  controllers: [LogsController],
  imports: [DatabaseModule],
  providers: [
    {
      provide: LOGS_REPOSITORY,
      useClass: LogsRepository,
    },
    {
      provide: LOGS_SERVICE,
      useClass: LogsService,
    },
  ],
  exports: [LOGS_SERVICE, LOGS_REPOSITORY],
})
export class LogsModule {}
