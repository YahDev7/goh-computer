import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports:[TypeOrmModule.forFeature([Customer]),EnterpriseModule],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports:[CustomerService]
})
export class CustomerModule {}
