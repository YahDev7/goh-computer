import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './schema/products.schema';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Products.name,
      schema:ProductsSchema,
    }
  ]),EnterpriseModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports:[ProductsService]
})
export class ProductsModule {}
