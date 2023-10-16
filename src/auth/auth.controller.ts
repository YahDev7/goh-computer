import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Public } from './decorators/public.decorator';
import { RolesDecorator } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from 'src/constants/roles';

@Controller('auth')
@UseGuards(JwtAuthGuard,RolesGuard)

export class AuthController {
    constructor(private authService: AuthService) { }
    //  @UseGuards(AuthCustomerGuard)
    @Public()
    @Post('/login')
    login(@Body() body) {
        return this.authService.login(body)
    }
    @RolesDecorator(Roles.ADMIN)
    @Post('/all')
    userall(@Request() req) {
        console.log("ta bien", req.user)
        return 
    }
}
