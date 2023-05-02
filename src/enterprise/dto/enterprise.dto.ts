import{IsString,IsNumber,IsNotEmpty, IsStrongPassword,IsEmail,MinLength,IsDateString,Length } from 'class-validator';

import {PartialType} from '@nestjs/mapped-types'
export class EnterpriseDto{
    @IsNotEmpty()
    @IsString()
    nombre: string;
  
    @IsNotEmpty()
    @IsString()
    ruc: string;
  
    @IsNotEmpty()
    @IsString()
    pais: string;
  
    @IsNotEmpty()
    @IsString()
    ciudad: string;
  
    @IsString()
    @Length(9, 9)
    telefono: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    pass: string;
  
    @IsString()
    @Length(2, 2)
    estado: string;

    @IsNotEmpty()
    fecha_creacion:Date;

    @IsNotEmpty()
    fecha_actualizacion:Date;
}

export class UpdateEnterpriseDto extends PartialType(EnterpriseDto) {} 
