import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProviderDocument = HydratedDocument<Provider>;

@Schema()
export class Provider {
  @Prop({ required: true })
  enterprise_id: number;

  @Prop({ unique: true })
  dni_ruc: string;

  @Prop({ required: true })
  razon_social: string;

  @Prop({ type: String })
  telefono: string;

  @Prop({ type: String })
  departamento: string;

  @Prop({ type: String })
  provincia: string;

  @Prop({ type: String })
  distrito: string;

  @Prop({ type: String })
  direccion: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, default: 'ACTIVO' })
  estado: string;


}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
