import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './schema/schema.provider';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Provider.name,
      schema:ProviderSchema,
    }
  ])/* TypeOrmModule.forFeature([Provider]) */,EnterpriseModule],
  providers: [ProviderService],
  controllers: [ProviderController],
  exports:[ProviderService]
})
export class ProviderModule {}
