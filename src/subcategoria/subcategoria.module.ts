import { Module } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubcategoriaController } from './subcategoria.controller';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoria, SubCategoriaSchema } from './schema/subcategoria.schema';


import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';


@Module({
  imports:[MongooseModule.forFeature([
    {
      name:SubCategoria.name,
      schema:SubCategoriaSchema,
    }
  ]),
  JwtModule.registerAsync({
    inject:[config.KEY],
    useFactory:(cofigService:ConfigType<typeof config>)=>{
      return{
        secret:cofigService.jwtSecret,//variables de entorno
        signOptions:{
          expiresIn:'10d'
        }
      }
    },
  })
  ,EnterpriseModule],
  providers: [SubcategoriaService],
  controllers: [SubcategoriaController],
  exports:[SubcategoriaService]
})
export class SubcategoriaModule {}
