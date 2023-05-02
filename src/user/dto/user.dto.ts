import { IsNotEmpty, IsString, IsEmail, IsNumber, Length } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  enterprise_id: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  ap_paterno: string;

  @IsNotEmpty()
  @IsString()
  ap_materno: string;

  @IsNotEmpty()
  @Length(8, 8)
  dni: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  rol: string;

  @IsNotEmpty()
  @Length(9, 9)
  telefono: string;

  @IsNotEmpty()
  fecha_creacion: Date;

  @IsNotEmpty()
  @IsString()
  estado: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
