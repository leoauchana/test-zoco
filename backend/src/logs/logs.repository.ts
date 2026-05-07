import { Injectable } from '@nestjs/common';
import { Log } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { ILogsRepository } from './interfaces/logs.repository.interface';

@Injectable()
export class LogsRepository implements ILogsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Log[]> {
    return await this.databaseService.log.findMany({
      orderBy: { executedAt: 'desc' },
      take: 50,
    });
  }

  async findOne(id: string): Promise<Log | null> {
    return await this.databaseService.log.findUnique({
      where: { id },
    });
  }

  async create(
    action: string,
    newCount: number,
    duplicates: number,
  ): Promise<Log> {
    return await this.databaseService.log.create({
      data: {
        action,
        newCount,
        duplicates,
      },
    });
  }
}
