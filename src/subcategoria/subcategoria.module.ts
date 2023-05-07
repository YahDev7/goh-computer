import { Module } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubcategoriaController } from './subcategoria.controller';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoria, SubCategoriaSchema } from './schema/subcategoria.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:SubCategoria.name,
      schema:SubCategoriaSchema,
    }
  ]),EnterpriseModule],
  providers: [SubcategoriaService],
  controllers: [SubcategoriaController],
  exports:[SubcategoriaService]
})
export class SubcategoriaModule {}
