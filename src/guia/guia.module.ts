import { Module } from '@nestjs/common';
import { GuiaController } from './guia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Guia, GuiaSchema } from './schema/schema.guia';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtLoginStrategy } from 'src/customer/strategy/customer.strategy';
import { GuiaService } from './guia.service';

@Module({
   imports:[MongooseModule.forFeature([
    {
      name:Guia.name,
      schema:GuiaSchema,
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
providers:[GuiaService,JwtLoginStrategy],
controllers: [GuiaController],
exports:[GuiaService]
})
export class GuiaModule {}
