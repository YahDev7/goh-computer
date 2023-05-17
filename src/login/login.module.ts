import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/customer/schema/schema.customer';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Customer.name,
      schema:CustomerSchema,
    }
  ])],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
