import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { hash } from 'bcrypt';
import { Customer, CustomeraDocument } from 'src/customer/schema/schema.customer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LoginService {
    constructor(
    @InjectModel(Customer.name) private CustomerModule:Model<CustomeraDocument> ,
   /*  private jwtService:JwtService */
   ){}

    async register(body:RegisterDto){
        const {password}=body
        let passhash=await hash(password,10)
        
        body={...body,password:passhash}
        console.log(body)
        return this.CustomerModule.create(body)
        
    }

    async login(body:LoginDto){
        console.log(body)
        return body
    }
   /*  async getToken(token){

        const decodedToken = this.jwtService.verify(token);
        return decodedToken.payload

        //console.log(body)
    } */
}
