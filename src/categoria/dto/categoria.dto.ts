import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'
import { ObjectId } from 'mongodb';
export class CategoriaDto {

//  @IsNotEmpty()
  usuario_id: ObjectId;

  enterprise_id: ObjectId;

  @IsString()
//  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  imagen: string;
 
  @IsOptional()
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

