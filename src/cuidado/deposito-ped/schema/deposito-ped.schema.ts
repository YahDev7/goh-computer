/* 
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type DepositoPedDocument = HydratedDocument<DepositoPed>;

@Schema()
export class DepositoPed {
    @Prop({required:true,unique:true})
    id_pedido: ObjectId;
    
    @Prop({required:true, unique:true})
    nro_operacion: string;
    
    @Prop({required:true})
    metodo_pago: string;
    
    @Prop({required:true})
    monto_deposito: number;
    
    @Prop({required:true})
    estado: string;
    
    @Prop({default:Date.now(),required:true})
    fecha_deposito: Date;
}

export const DepositoPedSchema = SchemaFactory.createForClass(DepositoPed);

 */