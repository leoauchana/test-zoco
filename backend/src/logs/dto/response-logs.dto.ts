import { Log } from '@prisma/client';

export class LogResponseDto {
  id: string;
  action: string;
  newCount: number;
  duplicates: number;
  executedAt: Date;

  static fromPrisma(log: Log): LogResponseDto {
    return {
      id: log.id,
      action: log.action,
      newCount: log.newCount,
      duplicates: log.duplicates,
      executedAt: log.executedAt,
    };
  }

  static fromPrismaArray(logs: Log[]): LogResponseDto[] {
    return logs.map((log) => LogResponseDto.fromPrisma(log));
  }
}
