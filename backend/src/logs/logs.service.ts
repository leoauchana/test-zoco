import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LogResponseDto } from './dto/response-logs.dto';
import { ILogsRepository } from './interfaces/logs.repository.interface';
import { ILogsService } from './interfaces/logs.service.interface';
import { LOGS_REPOSITORY } from './logs.constants';

@Injectable()
export class LogsService implements ILogsService {
  constructor(
    @Inject(LOGS_REPOSITORY)
    private readonly logsRepository: ILogsRepository,
  ) {}

  async findAll(): Promise<LogResponseDto[]> {
    const logs = await this.logsRepository.findAll();
    return LogResponseDto.fromPrismaArray(logs);
  }

  async findOne(id: string): Promise<LogResponseDto> {
    const log = await this.logsRepository.findOne(id);
    if (!log) throw new NotFoundException(`Log with id ${id} not found`);
    return LogResponseDto.fromPrisma(log);
  }

  async create(
    action: string,
    newCount: number,
    duplicates: number,
  ): Promise<void> {
    await this.logsRepository.create(action, newCount, duplicates);
  }
}
