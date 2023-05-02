import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports:[TypeOrmModule.forFeature([Categoria]),EnterpriseModule],
  providers: [CategoriaService],
  controllers: [CategoriaController]
})
export class CategoriaModule {}
