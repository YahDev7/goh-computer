import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto, LoginCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { ObjectId } from 'mongodb';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/guard.customer'; 

@Controller('customer')
export class CustomerController {

    constructor(
        private customerService:CustomerService
    ){}
   /*  @UseGuards(AuthGuard('jwtlogin'))  */
   @UseGuards(JwtAuthGuard)
    @Get()
    async get(){
        return this.customerService.get()
    }

    @Get(':id')
    async getId(@Param('id') id:ObjectId){
        return this.customerService.getId(id)
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

    @Post('gohcomputer/register') //generalizar
    register(@Body() body:CustomerDto){
        return this.customerService.post(body)
    }
    @Post('gohcomputer/login')
    login(@Body() body:LoginCustomerDto){
        return this.customerService.login(body)
    } 

    /* ENTERPRISE */
    @Get('/enterprise')
    async getByEnterprise(@Param('id') id:ObjectId){
        return this.customerService.getByEnterprise(id)
    }
    @Get(':id/enterprise')
    async getByIdEnterprise(@Param('id') id:ObjectId){
        return this.customerService.getByEnterprise(id)
    }
    
    @Post()
    async postEnterprise(@Body() body:CustomerDto){
        return this.customerService.post(body)
    }
    @Put(':id')
    async updateEnterpise(@Param('id', ParseIntPipe) id:number,@Body() body:UpdateCustomerDto){
        return this.customerService.update(id,body)
    }
    @Delete(':id')
    async deleteEnterpise(@Param('id', ParseIntPipe) id:number){
        return this.customerService.delete(id)
    }


}
