import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument } from 'mongoose';

export type EnterpriseDocument = HydratedDocument<Enterprise>;

@Schema()
export class Enterprise {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  ruc: string;

  @Prop({ required: true })
  pais: string;

  @Prop()
  ciudad: string;

  @Prop()
  telefono: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  pass: string;

  @Prop({ required: true })
  estado: string;

  @Prop({ type: Date, default: Date.now })
  fecha_creacion: Date;

  @Prop({ type: Date, default: Date.now })
  fecha_actualizacion: Date;
}

export const EnterpriseSchema = SchemaFactory.createForClass(Enterprise);
