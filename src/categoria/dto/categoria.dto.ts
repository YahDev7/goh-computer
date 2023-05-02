import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'
export class CategoriaDto {

  @IsNumber()
  @IsNotEmpty()
  usuario_id: number;

  @IsNumber()
  @IsNotEmpty()
  enterprise_id: number;

  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MaxLength(70)
  imagen: string;

  @IsString()
  @MaxLength(500)
  url_imagen: string;

  @IsString()
  estado: string;

}
export class UpdateCategoriaDto extends PartialType(CategoriaDto) {
/*   @IsOptional()
  @IsNumber()
  usuario_id: number;

  @IsOptional()
  @IsNumber()
  enterprise_id: number;

  @IsOptional()
  @IsNumber()
  nombre: string;

  @IsOptional()
  @IsNumber()
  imagen: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  url_imagen: string;
  
  @IsOptional()
  @IsString()
  estado: string; */
} 

