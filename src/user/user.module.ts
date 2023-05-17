import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/schema.user';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { JwtLoginUserStrategy } from './strategy/strategy.user';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:User.name,
      schema:UserSchema,
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
  }),
  EnterpriseModule
    /* TypeOrmModule.forFeature([User]),EnterpriseModule */],
  providers: [UserService,JwtLoginUserStrategy],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
