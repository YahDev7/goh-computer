import { Module } from '@nestjs/common';
import { CompespService } from './compesp.service';
import { CompespController } from './compesp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compesp } from './compesp.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Compesp])],
  providers: [CompespService],
  controllers: [CompespController]
})
export class CompespModule {}
