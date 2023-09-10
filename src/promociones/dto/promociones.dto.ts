import { IsArray, IsDecimal, IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsString, Length, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'
import { ObjectId } from 'mongodb';

export class PromocionesDto {
    @IsNotEmpty()
    @IsMongoId()
    producto_id: ObjectId;

    /*    @IsNotEmpty()
       @IsMongoId()
       enterprise_id: ObjectId; */

    @IsNotEmpty()
    @IsString()
    fecha_fin: Date;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)

    precio_compra_dolar_promo: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    precio_compra_dolar_igv_promo: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    precio_compra_dolar_con_IGV_Promo: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    precio_compra_soles_promo: number;

    @IsNotEmpty()
   // @IsNumber()
    valor_dolar: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    ganancia_promo: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    precio_venta_promo: number;

    @IsNotEmpty()
    @IsString()
    estado: string;
}

export class UpdatePromocionesDto extends PartialType(PromocionesDto) { } 
