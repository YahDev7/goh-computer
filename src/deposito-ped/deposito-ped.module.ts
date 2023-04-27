import { Module } from '@nestjs/common';
import { DepositoPedService } from './deposito-ped.service';
import { DepositoPedController } from './deposito-ped.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositoPed, DepositoPedSchema } from './schema/deposito-ped.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:DepositoPed.name,
      schema:DepositoPedSchema,
    }
  ])],
  providers: [DepositoPedService],
  controllers: [DepositoPedController]
})
export class DepositoPedModule {}
