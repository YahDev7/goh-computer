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

  @Prop() /* validar por dni */
  dni_rucs: string;

  
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

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({required:true})
  estado: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
