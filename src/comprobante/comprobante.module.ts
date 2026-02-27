import { Module } from '@nestjs/common';
import { ComprobanteController } from './Comprobante.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comprobante, ComprobanteSchema } from './schema/schema.Comprobante';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtLoginStrategy } from 'src/customer/strategy/customer.strategy';
import { ComprobanteService } from './services/Comprobante.service';

@Module({
   imports:[MongooseModule.forFeature([
    {
      name:Comprobante.name,
      schema:ComprobanteSchema,
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
], 
providers:[ComprobanteService,JwtLoginStrategy],
controllers: [ComprobanteController],
exports:[ComprobanteService]
})
export class ComprobanteModule {}
