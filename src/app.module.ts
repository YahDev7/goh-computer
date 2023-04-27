import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnterpriseService } from './enterprise/enterprise.service';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { CategoriaModule } from './categoria/categoria.module';
import { SubcategoriaModule } from './subcategoria/subcategoria.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { ProviderModule } from './provider/provider.module';
import { MovimientoModule } from './movimiento/movimiento.module';
import { CajaModule } from './caja/caja.module';
import { EspecificacionesModule } from './especificaciones/especificaciones.module';
import { CompespModule } from './compesp/compesp.module';
import { ProductsModule } from './products/products.module';
import { DocumentoModule } from './documento/documento.module';
import { DepositoPedModule } from './deposito-ped/deposito-ped.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'wiel postgre',
      database:'gohcomputer',
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true, /* para que este sincronizadp con lo mencionado anteriormente */
      logging: true,
      autoLoadEntities: true,
  }),MongooseModule.forRoot('mongodb+srv://yahiesdev:yahiesmongodb@goh.6zmhouc.mongodb.net/gohcomputer'),
    EnterpriseModule,
    CategoriaModule,
    SubcategoriaModule,
    UserModule,
    CustomerModule,
    ProviderModule,
    MovimientoModule,
    CajaModule,
    EspecificacionesModule,
    CompespModule,
    ProductsModule,
    DocumentoModule,
    DepositoPedModule]
 /*  controllers: [AppController],
  providers: [AppService, EnterpriseService], */
})
export class AppModule {}
