import { Body, Controller, Get, Param, ParseIntPipe, Post,Put,Delete } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/provider.dto';

@Controller('provider')
export class ProviderController {
    constructor(
        private providerService:ProviderService
    ){}

    @Get()
    async get(){
        return this.providerService.get()
    }

    @Get(':id')
    async getId(@Param('id') id:ObjectId){
        return this.providerService.getId(id)
    }
/* 
    @Post()
    async post(@Body() body:CreateProviderDto){
        return this.providerService.post(body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:UpdateProviderDto){
        return this.providerService.update(id,body)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.providerService.delete(id)
    } */
}



