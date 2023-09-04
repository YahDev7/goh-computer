import { IsNotEmpty, IsOptional, IsEmail, Length, IsNumberString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import {PartialType} from '@nestjs/mapped-types'
import { ObjectId } from 'mongodb';

export class LoginCustomerDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 30)
  email: string;

  @IsNotEmpty()
  @Length(1, 20)
  password: string;
}

export class RegisterCustomerDto {
 
   @IsNotEmpty()
   enterprise_id: ObjectId;
  
   @IsNotEmpty()
   @IsEmail()
   @Length(1, 30)
   email: string;
 
   @IsNotEmpty()
   @Length(1, 20)
   password: string;

   @IsNotEmpty()
   nombres: string;
   @IsNotEmpty()
   estado: string;
 
 }
export class CustomerDto {
 /*  @IsOptional()
  @Type(() => Number)
  id?: number; */

  @IsOptional()
  @Length(11, 11)
  dni_ruc: string;

  @IsNotEmpty()
  nombres: string;

  @IsOptional()
  @Length(1, 20)
  ap_paterno: string;

  @IsOptional()
  @Length(1, 20)
  ap_materno: string;

  @IsOptional()
  @IsNumberString()
  @Length(9, 10)
  telefono?: string;

  @IsOptional()
  @Length(1, 20)
  departamento?: string;

  @IsOptional()
  @Length(1, 20)
  provincia?: string;

  @IsOptional()
  @Length(1, 20)
  distrito?: string;

  @IsOptional()
  @Length(1, 40)
  direccion?: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 30)
  email: string;

  @IsNotEmpty()
  @Length(1, 20)
  password: string;

  @IsNotEmpty()
  @MaxLength(2)
  estado: string;
}
export class UpdateCustomerDto extends PartialType(CustomerDto) {}