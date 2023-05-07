import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'
import { ObjectId } from 'mongodb';

export class SubCategoriaDto {
  @IsNumber()
  @IsNotEmpty()
  usuario_id: number;

  @IsNumber()
  @IsNotEmpty()
  enterprise_id: number;

  @IsString()
  @IsNotEmpty()
  categoria_id: ObjectId;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MaxLength(70)
  imagen: string;

  @IsString()
  @MaxLength(500)
  url_imagen: string;

  @IsNotEmpty()
  @IsString()
  estado: string;
}

export class UpdateSubCategoriaDto extends PartialType(SubCategoriaDto) {}
