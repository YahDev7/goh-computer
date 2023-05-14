import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { ObjectId } from 'mongodb';

@Controller('customer')
export class CustomerController {

    constructor(
        private customerService:CustomerService
    ){}
    @Get()
    async get(){
        return this.customerService.get()
    }

    @Get(':id')
    async getId(@Param('id') id:ObjectId){
        return this.customerService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id') id:ObjectId){
        return this.customerService.getByEnterprise(id)
    }
    @Post()
    async post(@Body() body:CustomerDto){
        return this.customerService.post(body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:UpdateCustomerDto){
        return this.customerService.update(id,body)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.customerService.delete(id)
    }
}
