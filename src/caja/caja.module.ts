import { Module } from '@nestjs/common';
import { CajaService } from './caja.service';
import { CajaController } from './caja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caja } from './caja.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Caja])],
  providers: [CajaService],
  controllers: [CajaController]
})
export class CajaModule {}
