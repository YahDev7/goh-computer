import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto, LoginCustomerDto, RegisterCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { ObjectId } from 'mongodb';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/guard.customer'; 
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { Roles } from 'src/constants/roles';
import { RolesDecorator } from 'src/user/decorators/roles.decorator';
import { Public } from 'src/user/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtUserAuthGuard,RolesGuard)
@Controller('customer')
export class CustomerController {

    constructor(
        private customerService:CustomerService
    ){}
   /*  @UseGuards(AuthGuard('jwtlogin'))  */
    @Public()
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
    @RolesDecorator(Roles.COMUN)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.customerService.delete(id)
    }
    @Public()
    @Post('gohcomputer/register') //generalizar
    register(@Body() body:RegisterCustomerDto){
        return this.customerService.post(body)
    }
    @Public()
    @Post('gohcomputer/login')
    login(@Body() body:LoginCustomerDto){
        return this.customerService.login(body)
    } 

    @Public()
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
    @RolesDecorator(Roles.COMUN)
    @Get('/enterprise')
    async getByEnterprise(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.customerService.getByEnterprise(token)
    }
    @RolesDecorator(Roles.COMUN)
    @Get('/enterprise/dni')
    async getByEnterpriseDNI(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.customerService.getByEnterpriseDNI(token)
    }
    @RolesDecorator(Roles.COMUN)
    @Get('/enterprise/ruc')
    async getByEnterpriseRUC(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.customerService.getByEnterpriseRUC(token)
    }


    @RolesDecorator(Roles.COMUN)
     @Get('enterprise/getone/:id')
    async getByEnterpriseId(@Param('id') id:ObjectId){
        return this.customerService.getIdEnterprise(id)
    } 
    
    @RolesDecorator(Roles.COMUN)
    @Post('/enterprise')
    async postEnterprise(@Body() body:CustomerDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.customerService.postEnterprise(token,body)
    }
    @RolesDecorator(Roles.COMUN)
    @Put('enterprise/:id')
    async updateEnterpise(@Param('id') id:ObjectId,@Body() body:UpdateCustomerDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.customerService.updateByEnterprise(id,body,token)
    }
    @RolesDecorator(Roles.COMUN)
    @Delete('enterprise/:id')
    async deleteEnterpise(@Param('id') id:ObjectId,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.customerService.deleteByEnterprise(id,token)
    }


}
