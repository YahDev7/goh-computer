import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoria, CategoriaSchema } from './schema/categoria.schema';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Categoria.name,
      schema:CategoriaSchema,
    }
  ]),JwtModule.registerAsync({
    inject:[config.KEY],
    useFactory:(cofigService:ConfigType<typeof config>)=>{
      return{
        secret:cofigService.jwtSecret,//variables de entorno
        signOptions:{
          expiresIn:'10d'
        }
      }
    },
  }),EnterpriseModule],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports:[CategoriaService]
})
export class CategoriaModule {}
