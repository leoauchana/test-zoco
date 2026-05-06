import { Controller, Get, Post } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post()
  async runSync() {
    return await this.syncService.run();
  }

  @Get('logs')
  async getLogs() {
    return await this.syncService.getLogs();
  }
}
