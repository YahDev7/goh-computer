import { Module } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { PromocionesController } from './promociones.controller';

@Module({
  providers: [PromocionesService],
  controllers: [PromocionesController]
})
export class PromocionesModule {}
