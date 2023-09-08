import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private loginService:LoginService){}
   @Post('gohcomputer/register')
    register(@Body() body:RegisterDto){
        return this.loginService.register(body)
    }
    @Post('gohcomputer')
    login(@Body() body:LoginDto){
        return this.loginService.login(body)
    }
}
