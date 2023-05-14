import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {  HydratedDocument } from 'mongoose';


export type CustomeraDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop({ required: true })
  user_id: ObjectId;

  @Prop({ unique: true })
  dni: string;

  @Prop({ required: true })
  nombres: string;

  @Prop({ required: true })
  ap_paterno: string;

  @Prop({ required: true })
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
  pass: string;

  @Prop()
  estado: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
