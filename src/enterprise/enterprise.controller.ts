import { Body, Controller, Get, Param, ParseIntPipe, Post,Put,Delete, UseGuards } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseDto } from './dto/enterprise.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/constants/roles';
import { RolesDecorator } from 'src/user/decorators/roles.decorator';

@UseGuards(JwtUserAuthGuard,RolesGuard)
@Controller('enterprise')
export class EnterpriseController {
    constructor(
        private enterpriseService:EnterpriseService
    ){}

    @RolesDecorator(Roles.ADMIN)
    @Get()
    async get(){
        return this.enterpriseService.get()
    }

    @RolesDecorator(Roles.ADMIN)
    @Get(':id')
    async getId(@Param('id') id:ObjectId){
        return this.enterpriseService.getId(id)
    }

    @RolesDecorator(Roles.ADMIN)
    @Post()
    async post(@Body() body:EnterpriseDto){
        return this.enterpriseService.post(body)
    }

    @RolesDecorator(Roles.ADMIN)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:EnterpriseDto){
        return this.enterpriseService.update(id,body)
    }
    @RolesDecorator(Roles.ADMIN)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.enterpriseService.delete(id)
    }
}
