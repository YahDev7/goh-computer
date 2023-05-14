import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/schema.user';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:User.name,
      schema:UserSchema,
    }
  ]),EnterpriseModule
    /* TypeOrmModule.forFeature([User]),EnterpriseModule */],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
