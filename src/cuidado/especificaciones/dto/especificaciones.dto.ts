import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'
export class EspecificacionesDto {
  
  @IsNumber()
  @IsNotEmpty()
  enterprise_id: number;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(2)
  @IsNotEmpty()
  estado: string;
}
export class UpdateEspecificacionesDto extends PartialType(EspecificacionesDto) {} 