/* import { Module } from '@nestjs/common';
import { EspecificacionesService } from './especificaciones.service';
import { EspecificacionesController } from './especificaciones.controller';
import { Especificaciones } from './especificaciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports:[TypeOrmModule.forFeature([Especificaciones]),EnterpriseModule], 
  providers: [EspecificacionesService],
  controllers: [EspecificacionesController]
})
export class EspecificacionesModule {}
 */