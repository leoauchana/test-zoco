// ✅ Bien - una sola importación
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateVenuesDto {
  @IsString()
  @IsNotEmpty({ message: 'The name is required' })
  @MinLength(3, { message: 'The name must be at least 3 characters long' })
  @MaxLength(50, { message: 'The name must be at most 50 characters long' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'The location is required' })
  @MinLength(3, { message: 'The location must be at least 3 characters long' })
  @MaxLength(100, {
    message: 'The location must be at most 100 characters long',
  })
  ubicacion: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'The category must be at least 2 characters long' })
  @MaxLength(50, { message: 'The category must be at most 50 characters long' })
  categoria?: string;

  @IsString()
  @IsOptional()
  @MinLength(10, {
    message: 'The description must be at least 10 characters long',
  })
  @MaxLength(200, {
    message: 'The description must be at most 200 characters long',
  })
  descripcion?: string;

  @IsString()
  @IsOptional()
  fuente?: string = 'Manual';
}
