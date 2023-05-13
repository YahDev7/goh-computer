import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { PayLoadToken } from './dto/carrito.dto';

@Injectable()
export class CarritoService {
    constructor(private jwtService:JwtService){}

    async jwt(body){
        //console.log(body) //body me devulve un array
        //let {...re1}=body;

        const payload:PayLoadToken[]=body;
       // console.log(payload)
        let res={
            tokencarr:this.jwtService.sign({payload}),
            carr:body
        }
        return res
    }
    async getToken(token){

        const decodedToken = this.jwtService.verify(token);
        return decodedToken.payload

        //console.log(body)
    }



    
}
