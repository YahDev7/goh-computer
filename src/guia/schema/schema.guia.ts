import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {  HydratedDocument } from 'mongoose';

export type GuiaDocument = HydratedDocument<Guia>;

@Schema()
export class Guia { 
  @Prop({ required: true })
  enterprise_id: ObjectId;

  @Prop()
  user_id: ObjectId;

  @Prop({ type: Date, default: Date.now  })
  fecha: Date;

  @Prop()
  equipos:equipos[]

/*   @Prop()
  servicio:string */

 /*  @Prop()
  reparado:string */

/*   @Prop()
  tiempo_equipo:string */

  @Prop()
  customer_id:ObjectId

/*   @Prop()
  Customer:Customer
 */

  @Prop({required:true})
  estado: string;
}

interface equipos {
    nombre: string,
//    comentario: [],
    comentario: string,
    gama_equipo: string,
}

export const GuiaSchema = SchemaFactory.createForClass(Guia);
