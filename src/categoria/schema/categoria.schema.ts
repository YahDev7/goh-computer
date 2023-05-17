import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type CategoriaDocument = HydratedDocument<Categoria>;

@Schema()
export class Categoria{
  @Prop({ required: true})
  usuario_id: ObjectId;

  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop({ required: true, maxlength: 100, unique: true })
  nombre: string;

  @Prop({ maxlength: 200, unique: false })
  imagen: string;

  @Prop({maxlength: 500, unique:false })
  url_imagen: string;

  @Prop({ required: true, maxlength: 2 })
  estado: string;
}
export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
