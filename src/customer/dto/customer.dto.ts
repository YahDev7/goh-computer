import { IsNotEmpty, IsOptional, IsEmail, Length, IsNumberString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import {PartialType} from '@nestjs/mapped-types'

export class CustomerDto {
 /*  @IsOptional()
  @Type(() => Number)
  id?: number; */

  @IsNotEmpty()
  @Type(() => Number)
  enterprise_id: number;

  @IsNotEmpty()
  @Type(() => Number)
  user_id: number;

  @IsNotEmpty()
  @Length(8, 8)
  dni: string;

  @IsNotEmpty()
  nombres: string;

  @IsNotEmpty()
  @Length(1, 20)
  ap_paterno: string;

  @IsNotEmpty()
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
  @Length(1, 20)
  email: string;

  @IsNotEmpty()
  @Length(1, 20)
  pass: string;

  @MaxLength(2)
  estado?: string;
}
export class UpdateCustomerDto extends PartialType(CustomerDto) {}