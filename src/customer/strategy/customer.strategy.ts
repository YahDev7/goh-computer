import {Injectable,Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigType } from '@nestjs/config';
import { ExtractJwt,Strategy } from "passport-jwt";
import config from "src/config";


@Injectable()
export class JwtLoginStrategy extends PassportStrategy(Strategy,'jwtlogin')  {
    constructor(
        @Inject(config.KEY) configService: ConfigType<typeof config>){
        super({
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration:false,
                secretOrKey:configService.jwtSecret,
            });
    }
    validate(payload){//esta funcion se ejecuta por defecto es lo que hace un strategy
       //console.log(payload)
       //podemos desencriptar para ver de donde vieiene esa peticion
        return payload;
    }
}