import { JwtModule } from '@nestjs/jwt/dist';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import config from 'src/config';
import { JwtStrategy } from './strategy/carrito.strategy';

@Module({
  imports:[JwtModule.registerAsync({
    inject:[config.KEY],
    useFactory:(cofigService:ConfigType<typeof config>)=>{
      return{
        secret:cofigService.jwtSecret,//variables de entorno
        signOptions:{
          expiresIn:'10d'
        }
      }
    },
  })],
  providers: [CarritoService,JwtStrategy],
  controllers: [CarritoController],
  exports:[CarritoService]
})
export class CarritoModule {}
