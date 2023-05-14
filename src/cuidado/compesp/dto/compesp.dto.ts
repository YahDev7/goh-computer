import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'

export class CompEspDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    enterprise_id: number;

    @IsNumber()
    @IsNotEmpty()
    id_espec: number;

    @IsNumber()
    @IsNotEmpty()
    componente_id: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;
    
    @IsString()
    @IsNotEmpty()
    estado: string;
}

export class UpdateCompEspDto extends PartialType(CompEspDto) {}