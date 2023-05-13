/* import { Module } from '@nestjs/common';
import { DepositoPedService } from './deposito-ped.service';
import { DepositoPedController } from './deposito-ped.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositoPed, DepositoPedSchema } from './schema/deposito-ped.schema';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:DepositoPed.name,
      schema:DepositoPedSchema,
    }
  ]),EnterpriseModule,CustomerModule],
  providers: [DepositoPedService],
  controllers: [DepositoPedController]
})
export class DepositoPedModule {}
 */