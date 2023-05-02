import { Module } from '@nestjs/common';
import { CompespService } from './compesp.service';
import { CompespController } from './compesp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compesp } from './compesp.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[TypeOrmModule.forFeature([Compesp]),ProductsModule],
  providers: [CompespService],
  controllers: [CompespController]
})
export class CompespModule {}
