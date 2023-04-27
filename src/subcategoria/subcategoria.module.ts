import { Module } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubcategoriaController } from './subcategoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoria } from './subcategoria.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SubCategoria])],
  providers: [SubcategoriaService],
  controllers: [SubcategoriaController]
})
export class SubcategoriaModule {}
