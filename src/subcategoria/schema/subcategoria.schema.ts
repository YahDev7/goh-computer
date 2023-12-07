import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type SubCategoriaDocument = HydratedDocument<SubCategoria>;

@Schema()
export class SubCategoria {
  @Prop({ required: true })
  usuario_id: ObjectId;

  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop({ required: true })
  categoria_id: ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop({required:false})
    imagen: Image[];

  @Prop({ required: true, default: 'A', length:2})
  estado: string;
}
interface Image {
  public_id: string;
  nombre?: string;
  URL?: string;
}
export const SubCategoriaSchema = SchemaFactory.createForClass(SubCategoria);
