import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'
import { ObjectId } from 'mongodb';

export class SubCategoriaDto {
  //@IsString()
//  @IsNotEmpty()
  usuario_id: ObjectId;//necesita tener una classe

 // @IsString()
  //@IsNotEmpty()
  enterprise_id: ObjectId;

  @IsString()
  //@IsNotEmpty()
  categoria_id: ObjectId;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  imagen: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  url_imagen: string;

  @IsNotEmpty()
  @IsString()
  estado: string;
}

export class UpdateSubCategoriaDto extends PartialType(SubCategoriaDto) {}
