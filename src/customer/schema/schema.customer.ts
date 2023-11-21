import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {  HydratedDocument } from 'mongoose';


export type CustomeraDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop()
  user_id: ObjectId;

  @Prop({ required: true,default:"DNI" }) /* validar por dni */
  tipo_doc: string;

  @Prop(/* { required: true } */) /* validar por dni */
  dni_ruc: string;
  
  @Prop({ required: true })
  nombres: string; 

  @Prop()
  ap_paterno: string;

  @Prop()
  ap_materno: string;

  @Prop()
  telefono: string;

  @Prop()
  departamento: string;

  @Prop()
  provincia: string;

  @Prop()
  distrito: string;

  @Prop()
  direccion: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({required:true})
  estado: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
