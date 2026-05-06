import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator/types/decorator/common/IsOptional';
import { MaxLength } from 'class-validator/types/decorator/string/MaxLength';
import { MinLength } from 'class-validator/types/decorator/string/MinLength';
import { IsBoolean } from 'class-validator/types/decorator/typechecker/IsBoolean';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';

export class UpdateVenueDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'The name must be at least 3 characters long' })
  @MaxLength(100, { message: 'The name must be at most 100 characters long' })
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'The category must be at least 2 characters long' })
  @MaxLength(50, { message: 'The category must be at most 50 characters long' })
  category?: string;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'The location must be at least 5 characters long' })
  @MaxLength(200, {
    message: 'The location must be at most 200 characters long',
  })
  location?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, {
    message: 'The description must be at most 500 characters long',
  })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean;
}
