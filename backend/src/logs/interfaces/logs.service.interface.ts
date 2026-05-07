import { LogResponseDto } from '../dto/response-logs.dto';

export interface ILogsService {
  findAll(): Promise<LogResponseDto[]>;
  findOne(id: string): Promise<LogResponseDto>;
  create(action: string, newCount: number, duplicates: number): Promise<void>;
}
