import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoria, CategoriaSchema } from './schema/categoria.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Categoria.name,
      schema:CategoriaSchema,
    }
  ]),EnterpriseModule],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports:[CategoriaService]
})
export class CategoriaModule {}
