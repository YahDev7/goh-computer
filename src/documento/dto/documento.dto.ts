import { IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class DocumentoDTO {
  @IsNumber()
  user_id: ObjectId;

  @IsNumber()
  customer_id: ObjectId;

  @IsNumber()
  caja_id: ObjectId;

  @IsNotEmpty()
  enterprise_id: ObjectId;

  @IsString()
  @IsNotEmpty()
  tipo_documento: string;

  @IsString()
  @IsNotEmpty()
  serie: string;

  @IsString()
  @IsNotEmpty()
  nro_documento: string;

  @Type(() => Date)
  @IsNotEmpty()
  fecha: Date;

  @IsNotEmpty()
  @IsNumber()
  sub_total: number;

  @IsNumber()
  descuento_total: number;

  @IsNotEmpty()
  @IsNumber()
  igv: number;

  @IsNotEmpty()
  @IsNumber()
  total_pagar: number;

  @MaxLength(15)
  @MinLength(1)
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  tipo_compra_venta: string;

  @IsNotEmpty()
/*   @ValidateNested({ each: true }) */
  detalle: Object[];
}



export class DocumentoCompraDTO {
  @IsNumber()
  user_id: ObjectId;

  @IsNumber()
  provider_id: ObjectId;

  @IsNumber()
  caja_id: ObjectId;

  @IsNotEmpty()
  enterprise_id: ObjectId;

  @IsString()
  @IsNotEmpty()
  tipo_documento: string;

  @IsString()
  @IsNotEmpty()
  serie: string;

  @IsString()
  @IsNotEmpty()
  nro_documento: string;

  @Type(() => Date)
  @IsNotEmpty()
  fecha: Date;

  @IsNotEmpty()
  @IsNumber()
  sub_total: number;

  @IsNumber()
  descuento_total: number;

  @IsNotEmpty()
  @IsNumber()
  igv: number;

  @IsNotEmpty()
  @IsNumber()
  total_pagar: number;

  @MaxLength(15)
  @MinLength(1)
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  tipo_compra_venta: string;

  @IsNotEmpty()
/*   @ValidateNested({ each: true }) */
  detalle: Object[];
}

export class DocumentoByCustomerDTO {
  @IsNumber()
  customer_id: ObjectId;
  
  @IsNumber()
  caja_id: ObjectId;

  @IsNotEmpty()
  enterprise_id: ObjectId;

  @IsString()
  @IsNotEmpty()
  tipo_documento: string;

  @IsString()
  @IsNotEmpty()
  serie: string;

  @IsString()
  @IsNotEmpty()
  nro_documento: string;

  @Type(() => Date)
  @IsNotEmpty()
  fecha: Date;

  @IsNotEmpty()
  @IsNumber()
  sub_total: number;

  @IsNumber()
  descuento_total: number;

  @IsNotEmpty()
  @IsNumber()
  igv: number;

  @IsNotEmpty()
  @IsNumber()
  total_pagar: number;

  @MaxLength(15)
  @MinLength(1)
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsNotEmpty()
  tipo_compra_venta: string;

  @IsNotEmpty()
/*   @ValidateNested({ each: true }) */
  detalle: Object[];
}
