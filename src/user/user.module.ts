import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),EnterpriseModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
