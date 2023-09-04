import { Module } from '@nestjs/common';
import { MovimientoMService } from './movimiento-m.service';
import { MovimientoMController } from './movimiento-m.controller';

import { CustomerModule } from 'src/customer/customer.module';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovimientoM, MovimientoMSchema } from './schema/movimiento-m.schema';
import { DocumentoModule } from 'src/documento/documento.module';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:MovimientoM.name,
      schema:MovimientoMSchema,
    }
  ]),  JwtModule.registerAsync({
    inject:[config.KEY],
    useFactory:(cofigService:ConfigType<typeof config>)=>{
      return{
        secret:cofigService.jwtSecret,//variables de entorno
        signOptions:{
          expiresIn:'10d'
        }
      }
    },
  }),EnterpriseModule,CustomerModule,DocumentoModule,/* ProductsModule */],
  providers: [MovimientoMService],
  controllers: [MovimientoMController],
  exports:[MovimientoMService]

})
export class MovimientoMModule {}
