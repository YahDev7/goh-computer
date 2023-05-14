import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schema/schema.customer';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Customer.name,
      schema:CustomerSchema,
    }
  ])/* TypeOrmModule.forFeature([Customer]) */,EnterpriseModule],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports:[CustomerService]
})
export class CustomerModule {}
