// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary/cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { ProductsModule } from 'src/products/products.module';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { MovimientoMModule } from 'src/movimiento-m/movimiento-m.module';

@Module({
  imports:[
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
    }),ProductsModule,MovimientoMModule],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [CloudinaryController]
})
export class CloudinaryModule {}
