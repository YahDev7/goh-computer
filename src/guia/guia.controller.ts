import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GuiaService } from './guia.service';
import { Public } from 'src/user/decorators/public.decorator';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { ObjectId } from 'mongodb';

@UseGuards(JwtUserAuthGuard,RolesGuard)
@Controller('guia')
export class GuiaController {
    constructor(
        private GuiaService:GuiaService
    ){}

    @Get('/enterprise')
    async get(){
        return this.GuiaService.get()
    }
    @Get('/enterprise/:id')
    async getId(@Param('id') id:ObjectId){
        return this.GuiaService.getId(id)
    }
    
    @Post('/enterprise')
    async post(@Req() req,@Body() body){

        return this.GuiaService.post(req.user,body)
    }
}
