import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports:[UserModule,PassportModule,EnterpriseModule,
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
    }), ],
  providers: [AuthService,JwtStrategy ],
  controllers: [AuthController]
})
export class AuthModule {}
