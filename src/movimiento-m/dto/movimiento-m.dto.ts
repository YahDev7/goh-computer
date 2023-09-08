import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ObjectId } from 'mongodb';
import { moveMessagePortToContext } from 'worker_threads';

export class MovimientoMDto {

  @IsString()
  @IsNotEmpty()
  documento_id: ObjectId;

  @IsOptional()
  @IsNotEmpty()
  enterprise_id: ObjectId; 

  @IsOptional()
  @IsString()
  caja_id: ObjectId;

  @IsString()
  fecha: Date;

  @IsString()
  @MaxLength(10)
  tipo: string;

  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

  @IsOptional()
  @IsString() 
  @MaxLength(100)
  nro_operacion: string;

  @IsOptional()
  @IsNumber()
  monto_deposito: number;

  @IsNumber()
  monto_pagar: number;

  @IsOptional()
  @IsNumber()
  vuelto: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  observacion: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  tipo_compra_venta: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  estado: string;

  @IsOptional()
  @IsNotEmpty()
  fileAdjunto: Object;
}

//export class UpdateMovimientoMDto extends PartialType(MovimientoMDto) {} 
export class UpdateMovimientoMDto {
  @IsString()
  @IsNotEmpty()
  documento_id: ObjectId;

  @IsNotEmpty()
  @IsOptional()
  enterprise_id: ObjectId; 

  @IsOptional()
  @IsString()
  caja_id: ObjectId;

  @IsString()
  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @MaxLength(10)
  tipo: string;

  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

  
  @IsNotEmpty()
  @IsString() 
  @MaxLength(100)
  nro_operacion: string;

  @IsNotEmpty()
  @IsNumber()
  monto_deposito: number;

  @IsNotEmpty()
  @IsNumber()
  monto_pagar: number;

  @IsNotEmpty()
  @IsNumber()
  vuelto: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  observacion: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  tipo_compra_venta: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  estado: string;

  @IsOptional()
  @IsNotEmpty()
  fileAdjunto: Object;
} 
