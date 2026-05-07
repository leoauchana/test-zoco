import { Controller, Get, Inject, Param } from '@nestjs/common';
import type { ILogsService } from './interfaces/logs.service.interface';

@Controller('logs')
export class LogsController {
  constructor(
    @Inject('ILogsService')
    private readonly logsService: ILogsService,
  ) {}

  @Get()
  async findAll() {
    return await this.logsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.logsService.findOne(id);
  }
}
