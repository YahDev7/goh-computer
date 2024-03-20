import { Module } from '@nestjs/common';
import { GuiaController } from './guia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GenGuia, GenGuiaSchema } from './schema/schema.guia';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtLoginStrategy } from 'src/customer/strategy/customer.strategy';
import { GuiaService } from './services/guia.service';
import { EquipoService } from 'src/equipos/equipos.service';
import { EquiposModule } from 'src/equipos/equipos.module';

@Module({
   imports:[MongooseModule.forFeature([
    {
      name:GenGuia.name,
      schema:GenGuiaSchema,
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
  }),EquiposModule
], 
providers:[GuiaService,JwtLoginStrategy],
controllers: [GuiaController],
exports:[GuiaService]
})
export class GuiaModule {}
