import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Documento, DocumentoSchema } from './schema/documento.schema';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { CustomerModule } from 'src/customer/customer.module';
import { UserModule } from 'src/user/user.module';
import { ProviderModule } from 'src/provider/provider.module';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Documento.name,
      schema:DocumentoSchema,
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
  }),EnterpriseModule,CustomerModule,UserModule,ProviderModule,ProductsModule],
  providers: [DocumentoService],
  controllers: [DocumentoController],
  exports:[DocumentoService]
})
export class DocumentoModule {}
