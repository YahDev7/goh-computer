import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;

@Schema()
export class Products {
    @Prop()
    subcategoria_id: number;
    
    @Prop()
    usuario_id: number;
    
    @Prop()
    enterprise_id: number;
    
    @Prop({required:true,unique:true})
    codigo: string;
    
    @Prop({required:true})
    nombre: string;
    
    @Prop({required:true})
    descripcion: string;
    
    @Prop({required:true})
    palabra_clave: string;
    
    @Prop({required:true})
    precio_compra_dolar: number;
    
    @Prop({required:true})
    igv: number;
    
    @Prop({required:true})
    precio_compra_dolar_igv: number;
    
    @Prop({required:true})
    precio_compra_soles: number;
    
    @Prop({required:true})
    ganancia: number;
    
    @Prop({required:true})
    precio_venta: number;
    
    @Prop({required:true,length:10,unique:true})
    codfabricante: string;
    
    @Prop()
    url_pro: string;
    
    @Prop()
    url_fab: string;

    @Prop()
    promocion: string;
    
    @Prop()
    precio_promocompra_dolar: number;
    
    @Prop()
    igvpromo: number;
    
    @Prop()
    precio_promocompra_dolar_igv: number;
    
    @Prop()
    precio_promocompra_soles: number;

    @Prop()
    ganancia_promo: number;
    
    @Prop()
    precio_promoventa: number;
    
    @Prop()
    fechafinpromo: Date;
    
    @Prop({required:true})
    garantia: string;
    
    @Prop({required:true})
    stock: number;
    
    @Prop({required:true})
    estado: string;
    
    @Prop()
    ventas: number;
    
    @Prop({required:true})
    userEdit: string; //CUESTINABLE
    
    @Prop({required:true,length:10})
    unidad: string;
    
    @Prop({required:true})
    marca: string;
    
    @Prop([String])
    imagenes: string[];
}

export const ProductsSchema = SchemaFactory.createForClass(Products);