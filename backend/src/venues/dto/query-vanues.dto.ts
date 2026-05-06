import { Type } from 'class-transformer';
import { IsBooleanString, IsInt, IsOptional, Min } from 'class-validator';

export class QueryVenuesDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsBooleanString()
  actives?: string;
}
