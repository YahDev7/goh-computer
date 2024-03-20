import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {  HydratedDocument } from 'mongoose';

export type GenGuiaDocument = HydratedDocument<GenGuia>;

@Schema()
export class GenGuia { 
  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop()
  usuario_id: ObjectId;

  @Prop({ type: Date, default: Date.now  })
  fecha: Date;

  @Prop()
  customer_id:ObjectId

  @Prop({required:true,default:"PENDIENTE"})
  estado: string;
}



export const GenGuiaSchema = SchemaFactory.createForClass(GenGuia);
