import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LibroReclaDocument = HydratedDocument<LibroRecla>;

@Schema()
export class LibroRecla {
  @Prop({ required: true, minlength: 1,maxlength:11 })
  dni_ruc: string;

  @Prop({ required: true, minlength: 1 })
  nombres: string;

  @Prop({ required: true, minlength: 1 })
  apellidos: string;

  /*  @Prop({ maxlength: 200, unique: false })
   imagen: string;
 
   @Prop({maxlength: 500, unique:false })
   url_imagen: string; */

  @Prop({ required: false })
  email: string;

  @Prop({ required: true, minlength: 1 })
  nro_pedido: string;

  @Prop({ required: true, minlength: 1,maxlength:255 })
  reclamo: string;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;

  @Prop({ required: true, minlength: 1 })
  estado: string;
}


export const LibroReclaSchema = SchemaFactory.createForClass(LibroRecla);
