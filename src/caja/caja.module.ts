import { Module } from '@nestjs/common';
import { CajaService } from './caja.service';
import { CajaController } from './caja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Caja, CajaSchema } from './schema/schema.caja';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Caja.name,
      schema:CajaSchema,
    }
  ]) /* TypeOrmModule.forFeature([Caja]) */],
  providers: [CajaService],
  controllers: [CajaController]
})
export class CajaModule {}
