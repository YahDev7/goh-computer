import { Module } from '@nestjs/common';
import { EspecificacionesService } from './especificaciones.service';
import { EspecificacionesController } from './especificaciones.controller';
import { Especificaciones } from './especificaciones.entity';

@Module({
  imports:[Especificaciones], 
  providers: [EspecificacionesService],
  controllers: [EspecificacionesController]
})
export class EspecificacionesModule {}
