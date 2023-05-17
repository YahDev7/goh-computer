import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schema/schema.customer';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtLoginStrategy } from './strategy/customer.strategy';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Customer.name,
      schema:CustomerSchema,
    }
  ]),
  JwtModule.registerAsync({
    inject:[config.KEY],
    useFactory:(cofigService:ConfigType<typeof config>)=>{
      return{
        secret:cofigService.jwtSecret,//variables de entorno
        signOptions:{
          expiresIn:'10d'
        }
      }
    },
  })
  /* JwtModule.register({
    secret:process.env.JWTSECRET,
    signOptions:{
      expiresIn:'10d'
    }
  }) */
  /* TypeOrmModule.forFeature([Customer]) */,EnterpriseModule],
  providers: [CustomerService,JwtLoginStrategy],
  controllers: [CustomerController],
  exports:[CustomerService]
})
export class CustomerModule {}
