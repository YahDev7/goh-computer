import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ObjectId } from 'mongodb';

export class MovimientoMDto {

  @IsString()
  @IsNotEmpty()
  documento_id: ObjectId;

  @IsString()
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

  @IsString() 
  @MaxLength(100)
  @IsNotEmpty()
  nro_operacion: string;

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
}
