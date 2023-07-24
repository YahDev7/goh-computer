import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

import {PartialType} from '@nestjs/mapped-types'

export class DocumentoByCustomerDTO {
  @IsString()
  customer_id: ObjectId;

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

  @IsString()
  @IsNotEmpty()
  metodo_pago: string;
  
  @IsOptional()
  dataCustomer: Object[];
}

export class DocumentoDTO extends PartialType(DocumentoByCustomerDTO)  {
  @IsString()
  user_id: ObjectId;

  @IsString()
  caja_id: ObjectId;
}



export class DocumentoCompraDTO extends PartialType(DocumentoByCustomerDTO) {

  @IsString()
  provider_id: ObjectId;
}

/* export class DocumentoByCustomerDTO {
  @IsString()
  customer_id: ObjectId;
  
  @IsString()
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

  detalle: Object[];
} */
