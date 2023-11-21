import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Images, ImagesSchema } from './schema/images.schema';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { ImagesService } from './images.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Images.name,
        schema:ImagesSchema,
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
    }),EnterpriseModule,UserModule
  ],
  providers:[ImagesService],
  controllers: [ImagesController],
  exports:[ImagesService]

})
export class ImagesModule {}
