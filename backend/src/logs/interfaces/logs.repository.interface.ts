import { Log } from '@prisma/client';

export interface ILogsRepository {
  findAll(): Promise<Log[]>;
  findOne(id: string): Promise<Log | null>;
  create(action: string, newCount: number, duplicates: number): Promise<Log>;
}
