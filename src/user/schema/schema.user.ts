import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {  HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop() //no se si deberia tener esta propiedad
  userAdmin_id: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  ap_paterno: string;

  @Prop({ required: true })
  ap_materno: string;

  @Prop({ unique: true, required: true })
  dni: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  rol: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ type: Date, default: Date.now })
  fecha_creacion: Date;

  @Prop()
  estado: string;

/*   @Prop({ type: Schema.Types.ObjectId, ref: 'Enterprises' })
  enterprise: Enterprises; */

  // Relaciones con otras entidades
  // ...

}

export const UserSchema = SchemaFactory.createForClass(User);
