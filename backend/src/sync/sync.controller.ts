import { Controller, Get, Inject, Post } from '@nestjs/common';
import type { ISyncService } from './interfaces/sync.service.interface';

@Controller('sync')
export class SyncController {
  constructor(
    @Inject('ISyncService')
    private readonly syncService: ISyncService,
  ) {}

  @Post()
  async runSync() {
    return await this.syncService.run();
  }

  @Get('logs')
  async getLogs() {
    return await this.syncService.getLogs();
  }
}
