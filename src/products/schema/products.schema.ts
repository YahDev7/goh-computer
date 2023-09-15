import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type ProductsDocument = HydratedDocument<Products>;

@Schema()
export class Products {
    @Prop()
    subcategoria_id: ObjectId;
    
    @Prop()
    usuario_id: ObjectId;
    
    @Prop()
    enterprise_id: ObjectId;
    
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
    valor_dolar: number;
    
    @Prop({required:true})
    precio_compra_dolar_igv: number;
    
    @Prop({required:true})
    precio_compra_dolar_con_IGV:number;

    @Prop({required:true})
    precio_compra_soles: number;

    @Prop({required:true})
    ganancia: number;

    @Prop({required:true})
    precio_venta: number;

    @Prop([Object])
    especificaciones:Object[]    
        
    @Prop({length:10,unique:true})
    codfabricante: string;
    
    @Prop()
    url_pro: string;
    
    @Prop()
    url_fab: string;
     
    @Prop({required:true})
    garantia: string;
    
    @Prop({required:true})
    stock: number;
    
    @Prop({required:true})
    estado: string;
    
    @Prop()
    ventas: number;
    
    @Prop({required:true,length:10})
    unidad: string;
    
    @Prop({required:true})
    marca: string;
    
    @Prop([Object])
    imagenes: Image[];
    
}

interface Image {
    public_id: string;
    nombre?: string;
    URL?: string;
  }

export const ProductsSchema = SchemaFactory.createForClass(Products);