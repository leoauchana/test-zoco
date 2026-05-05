import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator/types/decorator/common/IsOptional';
import { MaxLength } from 'class-validator/types/decorator/string/MaxLength';
import { MinLength } from 'class-validator/types/decorator/string/MinLength';
import { IsBoolean } from 'class-validator/types/decorator/typechecker/IsBoolean';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';

export class UpdateVenuesDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre?: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'The category must be at least 2 characters long' })
  @MaxLength(50, { message: 'The category must be at most 50 characters long' })
  categoria?: string;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'La ubicación debe tener al menos 5 caracteres' })
  @MaxLength(200, { message: 'La ubicación no puede exceder 200 caracteres' })
  ubicacion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  activo?: boolean;
}
