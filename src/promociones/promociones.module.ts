import { Module } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { PromocionesController } from './promociones.controller';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Promociones, PromocionesSchema } from './schema/promociones.schema';
import { UserModule } from 'src/user/user.module';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Promociones.name,
      schema:PromocionesSchema,
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
    }),UserModule,EnterpriseModule
  ],
  providers: [PromocionesService],
  controllers: [PromocionesController]
})
export class PromocionesModule {}
