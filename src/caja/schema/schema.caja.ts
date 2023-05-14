import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type CajaDocument = HydratedDocument<Caja>;

@Schema()
export class Caja {
  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop({ type: String, default: 'ABIERTA' })
  tipo: string;

  @Prop({ type: Date, default: Date.now })
  fecha_apertura: Date;

  @Prop({ type: Number })
  monto_apertura: number;

  @Prop({ type: Date })
  fecha_cierre: Date;

  @Prop({ type: Number })
  monto_cierre: number;

  @Prop({ type: Number })
  monto_cierre_real: number;

  @Prop({ type: String, default: 'ACTIVO' })
  estado: string;

}

export const CajaSchema = SchemaFactory.createForClass(Caja);
