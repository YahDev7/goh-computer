import { IsArray, IsDecimal, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength, Min, isNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'
import { ObjectId } from 'mongodb';

export class ProductServiceDto {
  @IsNotEmpty({ message: "Seleccione la subcategoria" })
  @IsString()
  subcategoria_id: ObjectId;

  
  @IsNotEmpty()
  @IsString()
  usuario_id: ObjectId;

  @IsString()
  enterprise_id: ObjectId;

  @IsNotEmpty({ message: "Ingrese el nombre del producto" })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty({ message: "Ingrese la descripcion del producto" })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsPositive({ message: "El valor del Precio_venta tiene que ser mayor que 0" })
  precio_venta: number;

  @IsNotEmpty({ message: "Ingrese la garantia" })
  @IsString()
  @IsNotEmpty()
  garantia: string;

  @IsNotEmpty({ message: "Ingrese el stock del producto" })
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  estado: string;

  @MaxLength(10)
  @IsString()
  @IsNotEmpty({ message: "Ingrese el tipo de producto" })
  unidad: string;


  /*  @IsOptional()
    @IsArray()
   imagenes: Object[]; */
}

export class ProductDto {
  @IsNotEmpty({ message: "Seleccione la subcategoria" })
  @IsString()
  subcategoria_id: ObjectId;

  @IsNotEmpty()
  @IsString()
  usuario_id: ObjectId;

  @IsString()
  enterprise_id: ObjectId;

  @IsNotEmpty({ message: "Ingrese el codigo del producto" })
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty({ message: "Ingrese el nombre del producto" })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty({ message: "Ingrese la descripcion del producto" })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty({ message: "Ingrese la palabra clave del producto" })
  @IsString()
  @IsNotEmpty()
  palabra_clave: string;

  @Min(1, { message: "El valor tiene que ser superior a 1" })
  @IsNotEmpty({ message: "Ingrese el precio compra del producto" })
  @IsPositive({ message: "El valor del precio_compra_dolar tiene que ser mayor que 0" })
  precio_compra_dolar: number;



  @Min(1, { message: "El valor del dolar tiene que ser superior a 1" })
  @IsNumber({maxDecimalPlaces:2},{message:"tiene que tener 2 digitos en decimal"})
  @IsNotEmpty({ message: "Ingrese el valor del dolar" })
//    @IsDecimal({decimal_digits:"2"})
  valor_dolar: number;




  @IsNotEmpty()
  @IsNumber()
  precio_compra_dolar_con_IGV: number;


  @IsArray()
  especificaciones: Object[]


  @IsNotEmpty()
  @IsPositive({ message: "El valor del precio_compra_dolar_igv tiene que ser mayor que 0" })
  precio_compra_dolar_igv: number;

  @IsNotEmpty()
  @IsPositive({ message: "El valor del precio_compra_soles tiene que ser mayor que 0" })
  precio_compra_soles: number;

  @IsNotEmpty({ message: "Ingrese la ganacia del producto" })
  @IsPositive({ message: "El valor de la ganancia tiene que ser mayor que 0" })
  ganancia: number;

  @IsNotEmpty()
  @IsPositive({ message: "El valor del Precio_venta tiene que ser mayor que 0" })
  precio_venta: number;

  @MaxLength(20)
  codfabricante: string;

  @IsString()
  url_pro: string;

  @IsString()
  url_fab: string;


  @IsNotEmpty({ message: "Ingrese la garantia" })
  @IsString()
  @IsNotEmpty()
  garantia: string;

  @IsNotEmpty({ message: "Ingrese el stock del producto" })
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  estado: string;


  @MaxLength(10)
  @IsString()

  @IsNotEmpty({ message: "Ingrese el tipo de producto" })
  unidad: string;

  @MaxLength(20)
  @IsNotEmpty({ message: "Ingrese la marca del producto" })
  @IsString()
  marca: string;

  @IsNumber()
  ventas: number;

  /*  @IsOptional()
    @IsArray()
   imagenes: Object[]; */
}
export class UpdateProductDto extends PartialType(ProductDto) { }
export class UpdateProductServiceDto extends PartialType(ProductServiceDto) { }

/* let prod = new ProductDto();

prod.precio_compra_dolar = 1; // inherited property */
