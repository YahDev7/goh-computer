import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, MaxLength } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'

export class ProductDto {
  @IsNotEmpty()
  @IsNumber()
  subcategoria_id: number;

  @IsNotEmpty()
  @IsNumber()
  usuario_id: number;

  @IsNotEmpty()
  @IsNumber()
  enterprise_id: number;

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
  
  @IsNumber()
  @IsNotEmpty()
  igv: number;

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

  @IsString()
  promocion: string;

  @IsNumber()
  precio_promocompra_dolar: number;

  @IsNumber()
  igvpromo: number;

  @IsNumber()
  precio_promocompra_dolar_igv: number;

  @IsNumber()
  precio_promocompra_soles: number;

  @IsNumber()
  ganancia_promo: number;

  @IsNumber()
  precio_promoventa: number;


  @IsString()
  fechafinpromo: Date;

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

  @IsNumber()
  ventas: number;

  @IsNotEmpty()
  userEdit: string;

  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  unidad: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsArray()
  imagenes: string[];
}
export class UpdateProductDto extends PartialType(ProductDto) {} 
