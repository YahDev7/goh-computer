import { Controller,Post,Body,Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CarritoService } from './carrito.service';

@Controller('carrito')
export class CarritoController {
    constructor(private carrService :CarritoService){}

    @Post('gohcomputer')
    async jwtCarr(@Body() body){
        return this.carrService.jwt(body)
    }

@UseGuards(AuthGuard('jwt'))
    @Post('gohcomputer/get')
    async getCarrToken(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.carrService.getToken(token)
    }


/* @UseGuards(AuthGuard('jwt'))
    @Get('gohcomputer/get')
    async getCarrToken(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.carrService.getToken(token)
    } */

}
