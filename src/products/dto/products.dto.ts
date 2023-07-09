import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, MaxLength } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'
import { ObjectId } from 'mongodb';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  subcategoria_id: ObjectId;

  @IsNotEmpty()
  @IsString()
  usuario_id: ObjectId;

  @IsNotEmpty()
  @IsString()
  enterprise_id: ObjectId;

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  palabra_clave: string;

  @IsNotEmpty()
  @IsNumber()
  precio_compra_dolar: number;
  
  @IsNotEmpty()
  @IsNumber()
  valor_dolar: number;
  
  @IsNotEmpty()
  @IsNumber()
  precio_compra_dolar_con_IGV:number;


  @IsArray()
  especificaciones:Object[]
  

  @IsNotEmpty()
  @IsNumber()
  precio_compra_dolar_igv: number;

  @IsNotEmpty()
  @IsNumber()
  precio_compra_soles: number;

  @IsNotEmpty()
  @IsNumber()
  ganancia: number;

  @IsNotEmpty()
  @IsNumber()
  precio_venta: number;

  @MaxLength(20)
  codfabricante: string;

  @IsString()
  url_pro: string;

  @IsString()
  url_fab: string;


  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  garantia: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  estado: string;


  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  unidad: string;

  @MaxLength(20)
  @IsString()
  marca: string;

  @IsNumber()
  ventas: number;

 /*  @IsArray()
  imagenes: Object[]; */
}
export class UpdateProductDto extends PartialType(ProductDto) {} 
