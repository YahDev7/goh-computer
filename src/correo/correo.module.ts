import { Module } from '@nestjs/common';
import { CorreoService } from './correo.service';
import { CorreoController } from './correo.controller';

@Module({
  providers: [CorreoService],
  controllers: [CorreoController]
})
export class CorreoModule {}
