import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Documento, DocumentoSchema } from './schema/documento.schema';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { CustomerModule } from 'src/customer/customer.module';
import { UserModule } from 'src/user/user.module';
import { ProviderModule } from 'src/provider/provider.module';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Documento.name,
      schema:DocumentoSchema,
    }
  ]),EnterpriseModule,CustomerModule,UserModule,ProviderModule],
  providers: [DocumentoService],
  controllers: [DocumentoController]
})
export class DocumentoModule {}
