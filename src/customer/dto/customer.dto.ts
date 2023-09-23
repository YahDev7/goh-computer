import { IsNotEmpty, IsOptional, IsEmail, Length, IsNumberString, MaxLength, IsEmpty, ValidateIf } from 'class-validator';
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

  @IsNotEmpty()
  tipo_doc: string;

  @IsNotEmpty()
  @Length(8, 11)
  dni_ruc: string;

  @IsNotEmpty()
  nombres: string;

  @IsOptional()
  @Length(0, 20)
  ap_paterno: string;

  @IsOptional()
  @Length(0, 20)
  ap_materno: string;

  @IsOptional()
  @IsNumberString()
  @Length(9, 10)
  telefono?: string;

  @IsOptional()
  @Length(0, 20)
  departamento?: string;

  @IsOptional()
  @Length(0, 20)
  provincia?: string;

  @IsOptional()
  @Length(0, 20)
  distrito?: string;

  @IsOptional()
  @Length(0, 40)
  direccion?: string;

  @IsOptional()
  @ValidateIf((o, value) => value !== null && value !== undefined && value!=="")
  @IsEmail()
  @Length(0, 30)
  email: string;

  @IsOptional()
  @Length(0, 20)
  password: string;

  @IsNotEmpty()
  @MaxLength(2)
  estado: string;
}
export class UpdateCustomerDto extends PartialType(CustomerDto) {}