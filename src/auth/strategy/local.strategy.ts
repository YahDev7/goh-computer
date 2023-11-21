import {  HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthCustomerStrategy extends PassportStrategy(Strategy,'authCustomer'){
    constructor(private AuthService:AuthService){
        super({
            usernameField:'email'
        }) //config
    }

    async validate(email:string,password:string){
        let user = await this.AuthService.validateUser(email,password)
        console.log(user)
        if (user instanceof HttpException) throw new UnauthorizedException()
        
        return user
    }
}