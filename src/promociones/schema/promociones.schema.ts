import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type PromocionesDocument = HydratedDocument<Promociones>;

@Schema()
export class Promociones {
    @Prop({required:true})
    producto_id: ObjectId;

    @Prop()
    enterprise_id: ObjectId;
    
    @Prop({required:true})
    fecha_fin: string;
    
    @Prop({required:true})
    precio_compra_dolar_promo: number;
    
    @Prop({required:true})
    precio_compra_dolar_igv_promo: number;
    
    @Prop({required:true})
    precio_compra_dolar_con_IGV_Promo:number;

    @Prop({required:true})
    precio_compra_soles_promo: number;

    @Prop({required:true})
    ganancia_promo: number;

    @Prop({required:true})
    precio_venta_promo: number;

    @Prop({required:true})
    valor_dolar: number;

    @Prop({required:true})
    estado: string;

    

}

export const PromocionesSchema = SchemaFactory.createForClass(Promociones);