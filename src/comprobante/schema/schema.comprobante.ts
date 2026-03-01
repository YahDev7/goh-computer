import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type ComprobanteDocument = HydratedDocument<Comprobante>;

@Schema()
export class Comprobante {
  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop()
  usuario_id: ObjectId;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;

  @Prop({ type: Date })
  fecha_retiro: Date;

  @Prop()
  customer_id: ObjectId

  @Prop({ required: false })
  modelo: string;

  @Prop({ required: false })
  marca: string;

  @Prop({ required: false })
  imei: string;

  @Prop({ required: false })
  estado_recibido: string;

  @Prop({ required: false })
  contra_pin: string;

  @Prop({ required: false })
  problema: string;

  @Prop({ required: false })
  componentes_testeados: string;

  @Prop({ required: false })
  total: number;

  @Prop({ required: false })
  pagado: number;

  @Prop({ required: false })
  pendiente: number;

  @Prop({ required: false })
  metodo_pago: string;

  @Prop({ required: false })
  observaciones: string;

  @Prop({ required: false })
  inversion: number;

  @Prop({ required: false })
  tecnico: number;

  @Prop({ required: true, default: "PENDIENTE" })
  estado: string;
}



export const ComprobanteSchema = SchemaFactory.createForClass(Comprobante);
