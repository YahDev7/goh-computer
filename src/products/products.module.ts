import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './schema/products.schema';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { SubcategoriaModule } from 'src/subcategoria/subcategoria.module';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Products.name,
      schema:ProductsSchema,
    }
  ]),
  EnterpriseModule,SubcategoriaModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports:[ProductsService]
})
export class ProductsModule {}
