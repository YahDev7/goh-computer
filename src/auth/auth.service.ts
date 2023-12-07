import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { ObjectId } from 'mongodb';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private UserService:UserService,
      private jwtService: JwtService,
        ){}

    async validateUser(email:string,password:string){
        try {
            const user =await this.UserService.getUser({email,password})
            if (user instanceof HttpException) throw user
    
            return user
        } catch (error) {
            return new HttpException('Ocurrio un error al listar ' + error.message || error, HttpStatus.NOT_FOUND)
            
        }
       
    }

    async login(body){
        try {
           let findUser = await this.UserService.getUser(body)
           if (findUser instanceof HttpException)  throw new UnauthorizedException()
           

           let comparepass = await compare(body.password, findUser.password)
            if(!comparepass) throw new UnauthorizedException()
            let {_id,email,enterprise_id,rol}=findUser

            let payload={
             _id,email,enterprise_id,rol
            }
            let token = this.jwtService.sign(payload)
            
            const data = {
                user: payload,
                token
            }
            return data 
        } catch (error) {
            return new HttpException('login erro ' + error.message || error, HttpStatus.NOT_FOUND)
            
        }
       
    }
    async register(body){
      /*   try {
            const {email,password,enterprise_id}=body
            let passhash = await hash(password, 10)
            
            let newbody = { ...body, password: passhash,enterprise_id: new ObjectId(enterprise_id)            }

            let create= await this.UserService.CreateByenterprise(newbody)
            if (create instanceof HttpException) throw create

            return create
        } catch (error) {
            return new HttpException('Ocurrio un error al listar ' + error.message || error, HttpStatus.NOT_FOUND)
            
        }
        */
    }
}
