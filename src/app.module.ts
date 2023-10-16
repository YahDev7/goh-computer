import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { enviroments } from './eviroment';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


import { EnterpriseModule } from './enterprise/enterprise.module';
import { CategoriaModule } from './categoria/categoria.module';
import { SubcategoriaModule } from './subcategoria/subcategoria.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { ProviderModule } from './provider/provider.module';
/* import { MovimientoModule } from './movimiento/movimiento.module'; */
import { CajaModule } from './caja/caja.module';
/* import { EspecificacionesModule } from './especificaciones/especificaciones.module'; */
/* import { CompespModule } from './compesp/compesp.module'; */
import { ProductsModule } from './products/products.module';
import { DocumentoModule } from './documento/documento.module';
/* import { DepositoPedModule } from './deposito-ped/deposito-ped.module'; */
import { CarritoModule } from './carrito/carrito.module';
import { MovimientoMModule } from './movimiento-m/movimiento-m.module';
import { LoginModule } from './login/login.module';
import { PromocionesModule } from './promociones/promociones.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ServiciosModule } from './servicios/servicios.module';
import config from './config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { CorreoModule } from './correo/correo.module';
import { AuthModule } from './auth/auth.module';

@Module({ 
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          }, 
        },
     /*    defaults: {
          from: 'gohcomputertechnology@gmail.com'
        }, */
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    }), ConfigModule.forRoot(),
    ConfigModule.forRoot({
    envFilePath:enviroments[process.env.NODE_ENV]||'.env',
    load:[config],
    isGlobal:true, //para que a todos los servicios sin tener la necesidad de llamar en cada archivo
    validationSchema:Joi.object({//validar que variables de entorno tenego que tener al hacer deploy        
      API_KEY:Joi.string().required(),
      //DATABASE_HOST:Joi.string().required(),
     // DATABASE_NAME:Joi.string().required(),
      DATABASE_MONGODB:Joi.string().required(),
      //DATABASE_PORT:Joi.number().required(),
      //DATABASE_USERNAME:Joi.string().required(),
     // DATABASE_PASSWORD:Joi.string().required(),
      JWTSECRET:Joi.string().required(),
    })
  }),
  /* , TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DATABASE_HOST,
      port:parseInt(process.env.DATABASE_PORT),
      username:process.env.DATABASE_USERNAME,
      password:process.env.DATABASE_PASSWORD,
      database:process.env.DATABASE_NAME,
      entities:[__dirname + '/**.entity{.ts,.js}'],
      //synchronize:true,  para que este sincronizadp con lo mencionado anteriormente 
      logging: true,
      autoLoadEntities: true,
  }), */MongooseModule.forRoot(process.env.DATABASE_MONGODB),
    EnterpriseModule,
    CategoriaModule,
    SubcategoriaModule,
    UserModule,
    CustomerModule,
    ProviderModule,
    CajaModule,
   /*  EspecificacionesModule, */
   /*  CompespModule, */
    ProductsModule,
    DocumentoModule,
   /*  DepositoPedModule, */
    CarritoModule,
    MovimientoMModule,
    LoginModule,
    PromocionesModule,
    CloudinaryModule,
    ServiciosModule,
    CorreoModule,
    AuthModule]
 /*  controllers: [AppController],
  providers: [AppService, EnterpriseService], */
})
export class AppModule {}
