import {Injectable,Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigType } from '@nestjs/config';
import { ExtractJwt,Strategy } from "passport-jwt";

import { PayLoadToken } from "../dto/carrito.dto";
import config from "src/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt')  {
    constructor(
        @Inject(config.KEY) configService: ConfigType<typeof config>){
        super({
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration:false,
                secretOrKey:configService.jwtSecret,
            });
    }
    validate(payload:PayLoadToken){//esta funcion se ejecuta por defecto es lo que hace un strategy
       //console.log(payload)
        return payload;
    }
}