import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto, LoginCustomerDto, RegisterCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
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
   
  /*   @Post()
    async post(@Body() body:CustomerDto){
        return this.customerService.post(body)
    } */

   /*  @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:UpdateCustomerDto){
        return this.customerService.update(id,body)
    } */
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.customerService.delete(id)
    }

    @Post('gohcomputer/register') //generalizar
    register(@Body() body:RegisterCustomerDto){
        return this.customerService.post(body)
    }
    @Post('gohcomputer/login')
    login(@Body() body:LoginCustomerDto){
        return this.customerService.login(body)
    } 

    @Get('web/getdatauser')
    async getDataUser(@Req() req){
        const token = req.headers.authorization.split(' ')[1];

       // res.header('Authorization', `Bearer ${token}`);
       //ANTES DE ENVIAR AL FRONT  OBTENER EL TOKEN Y ENVIAR EL TOKEN EN LOS HEADERS
        return this.customerService.getDataUser(token)
    }

    /* ENTERPRISE */
  /*   @Get('/enterprise')
    async getByEnterprise(@Param('id') id:ObjectId){
        return this.customerService.getByEnterprise(id)
    } */
    @Get('/enterprise')
    async getByEnterprise(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.customerService.getByEnterprise(token)
    }


     @Get('enterprise/:id')
    async getByEnterpriseId(@Param('id') id:ObjectId){
        return this.customerService.getIdEnterprise(id)
    } 
    
    @Post('/enterprise')
    async postEnterprise(@Body() body:CustomerDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.customerService.postEnterprise(token,body)
    }
    @Put('enterprise/:id')
    async updateEnterpise(@Param('id') id:ObjectId,@Body() body:UpdateCustomerDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.customerService.updateByEnterprise(id,body,token)
    }
    @Delete('enterprise/:id')
    async deleteEnterpise(@Param('id') id:ObjectId,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.customerService.deleteByEnterprise(id,token)
    }


}
