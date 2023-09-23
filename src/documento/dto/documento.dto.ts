import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength,IsNotEmptyObject, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

import {PartialType} from '@nestjs/mapped-types'

export class DocumentoBase {
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
  detalle: Detalle[];

  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

  @IsNotEmptyObject()
  dataCustomer: {
    nombres: string;
    apellidos: string;
    dni: string;
    departamento:string;
    provincia:string;
    distrito:string;
    direccion:string;
    referencia:string;
    celular:string;
    correo:string;
  };
}


export class DocumentoByCustomerDTO extends PartialType(DocumentoBase)  {
  @IsString()
  customer_id: ObjectId;

}
 
export class DocumentoDTO{

  enterprise_id: ObjectId;

  @IsOptional()
  @IsString()
  user_id: ObjectId;

  @IsOptional()
  @IsString()
  caja_id: ObjectId;

  @IsString()
  customer_id: ObjectId;

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
  detalle: Detalle[];

  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

  @IsOptional()
  dataCustomer: {
    nombres: string;
    apellidos: string;
    dni: string;
    departamento:string;
    provincia:string;
    distrito:string;
    direccion:string;
    referencia:string;
    celular:string;
    correo:string;
  };


  
}



export class DocumentoCompraDTO {

  enterprise_id: ObjectId;

  @IsOptional()
  @IsString()
  user_id: ObjectId;

  @IsOptional()
  @IsString()
  caja_id: ObjectId;

  @IsString()
  provider_id: ObjectId;

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
  detalle: Detalle[];

  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

  @IsOptional()
  dataCustomer: {
    nombres: string;
    apellidos: string;
    dni: string;
    departamento:string;
    provincia:string;
    distrito:string;
    direccion:string;
    referencia:string;
    celular:string;
    correo:string;
  };

  



}


interface Detalle {
  _id: ObjectId,
  nombre: string,
  cantidad: number,
  descuento: number,
  importe: number,
  precioUnitario:number

}