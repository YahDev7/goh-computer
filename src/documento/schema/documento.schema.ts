
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type DocumentoDocument = HydratedDocument<Documento>;

@Schema()
export class Documento{

    @Prop()
    user_id: number;
    
    @Prop()
    customer_id: number;

    @Prop()
    provider_id: number;
    
    @Prop()
    caja_id: number;
    
    @Prop({required:true})
    enterprise_id: number;
    
    @Prop({required:true})
    tipo_documento: string;
    
    @Prop({required:true})
    serie: string;
    
    @Prop({required:true})
    nro_documento: string;
    
    @Prop({default:Date.now(),required:true})
    fecha: Date;
    
    @Prop({required:true})
    sub_total: number;
    
    @Prop()
    descuento_total: number;
    
    @Prop({required:true})
    igv: number;
    
    @Prop({required:true})
    total_pagar: number;
    
    @Prop({required:true,minlength:1,maxlength:10})
    estado: string;
    
    @Prop({required:true})
    tipo_compra_venta: string;
    
    @Prop([Object])
    detalle: Object[];
}

export const DocumentoSchema = SchemaFactory.createForClass(Documento);

