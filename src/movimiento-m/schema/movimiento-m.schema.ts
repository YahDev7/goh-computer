import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type MovimientoMDocument = HydratedDocument<MovimientoM>;

@Schema()
export class MovimientoM {

  @Prop({ required: true })
  documento_id: ObjectId;

  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop()
  caja_id: ObjectId;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;

  @Prop({ maxlength: 10 })
  tipo: string;

  @Prop({ required: true })
  metodo_pago: string;

  @Prop({ maxlength: 100 })
  nro_operacion: string;

  @Prop({ type: Number })
  monto_deposito: number;

  @Prop({ type: Number, required: true })
  monto_pagar: number;

  @Prop({ type: Number })
  vuelto: number;

  @Prop({ maxlength: 40 })
  observacion: string;

  @Prop({ maxlength: 10, required: true })
  tipo_compra_venta: string;

  @Prop({ maxlength: 15, required: true })
  estado: string;

  @Prop({type:Object})
  fileAdjunto: Object;

}

export const MovimientoMSchema = SchemaFactory.createForClass(MovimientoM);
