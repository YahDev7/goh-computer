import {  HttpException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "src/config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwtauth'){
    constructor(@Inject(config.KEY) configService: ConfigType<typeof config>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtSecret,
        }) //config
    }

    async validate(payload){ //aqui al momento nde validar que el JWT es valido se desencripta
        return payload
    }
}