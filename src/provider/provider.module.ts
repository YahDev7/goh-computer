import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports:[TypeOrmModule.forFeature([Provider]),EnterpriseModule],
  providers: [ProviderService],
  controllers: [ProviderController],
  exports:[ProviderService]
})
export class ProviderModule {}
