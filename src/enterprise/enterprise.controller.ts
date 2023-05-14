import { Body, Controller, Get, Param, ParseIntPipe, Post,Put,Delete } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseDto } from './dto/enterprise.dto';
import { ObjectId } from 'mongodb';

@Controller('enterprise')
export class EnterpriseController {
    constructor(
        private enterpriseService:EnterpriseService
    ){}

    @Get()
    async get(){
        return this.enterpriseService.get()
    }

    @Get(':id')
    async getId(@Param('id') id:ObjectId){
        return this.enterpriseService.getId(id)
    }

    @Post()
    async post(@Body() body:EnterpriseDto){
        return this.enterpriseService.post(body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:EnterpriseDto){
        return this.enterpriseService.update(id,body)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.enterpriseService.delete(id)
    }
}
