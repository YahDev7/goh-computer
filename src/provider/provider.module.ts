import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './provider.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Provider])],
  providers: [ProviderService],
  controllers: [ProviderController]
})
export class ProviderModule {}
