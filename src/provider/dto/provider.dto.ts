import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  enterprise_id: ObjectId;

  @IsString()
  dni_ruc: string;

  @IsNotEmpty()
  razon_social: string;

  @IsString()
  telefono: string;

  @IsString()
  departamento: string;

  @IsString()
  provincia: string;

  @IsString()
  distrito: string;

  @IsString()
  direccion: string;

  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(1)
  estado: string;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {} 
