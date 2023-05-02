import { Module } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubcategoriaController } from './subcategoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoria } from './subcategoria.entity';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports:[TypeOrmModule.forFeature([SubCategoria]),EnterpriseModule],
  providers: [SubcategoriaService],
  controllers: [SubcategoriaController]
})
export class SubcategoriaModule {}
