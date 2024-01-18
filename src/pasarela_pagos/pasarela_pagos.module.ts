import { Module } from '@nestjs/common';
import { PasarelaPagosController } from './pasarela_pagos.controller';

@Module({
  controllers: [PasarelaPagosController]
})
export class PasarelaPagosModule {}
