
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type ImagesDocument = HydratedDocument<Images>;

@Schema()
export class Images{

    @Prop()
    public_id: string;
    
    @Prop()
    secure_url: string;

    @Prop()
    account: string;

    @Prop()
    enterprise_id: ObjectId;

    @Prop()
    label: [];

    @Prop()
    estado: string;
}

export const ImagesSchema = SchemaFactory.createForClass(Images);