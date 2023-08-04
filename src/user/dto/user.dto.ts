import { IsNotEmpty, IsString, IsEmail, IsNumber, Length } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'
import { ObjectId } from 'mongodb';


export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(1, 20)
  password: string;
}

export class StructureToken {
  id: string;
  nombre: string;
  enterprise_id: string;
  rol: string;
  iat:number;
  exp:number;
}


export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  enterprise_id: ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}


export class CreateUserDto {
  
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
