import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';
import { string } from 'joi';

export type SubCategoriaDocument = HydratedDocument<SubCategoria>;

@Schema()
export class SubCategoria {
  @Prop({ required: true })
  usuario_id: number;

  @Prop({ required: true })
  enterprise_id: number;

  @Prop({ required: true })
  categoria_id: ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  imagen: string;

  @Prop()
  url_imagen: string;

  @Prop({ required: true, default: 'A', length:2})
  estado: string;
}

export const SubCategoriaSchema = SchemaFactory.createForClass(SubCategoria);
