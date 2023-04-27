import { Module } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoController } from './movimiento.controller';
import { Movimiento } from './movimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Movimiento])],
  providers: [MovimientoService],
  controllers: [MovimientoController]
})
export class MovimientoModule {}
