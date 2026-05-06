import { LogResponseDto } from 'src/logs/dto/response-logs.dto';

export interface ISyncService {
  run(): Promise<{ news: number; duplicates: number }>;
  getLogs(): Promise<LogResponseDto[]>;
}
