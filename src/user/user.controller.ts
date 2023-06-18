import { Body, Controller, Get, Param, ParseIntPipe, Post,Put,Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from './guards/guard.user';
import { Public } from './decorators/public.decorator';
import { RolesDecorator } from './decorators/roles.decorator';
import { Roles } from 'src/constants/roles';
import { RolesGuard } from './guards/roles.guard';
@UseGuards(JwtUserAuthGuard,RolesGuard)
@Controller('user')
export class UserController {

    constructor(
        private userService:UserService
    ){}
    
    @RolesDecorator(Roles.ADMIN)
    @Get()
    async get(){
        return this.userService.get()
    }

    @RolesDecorator(Roles.ADMIN)
    @Get(':id')
    async getId(@Param('id') id:ObjectId){
        return this.userService.getId(id)
    }
  
    @RolesDecorator(Roles.ADMIN)
    @Post()
    async post(@Body() body:CreateUserDto){
        return this.userService.post(body)
    }

    @RolesDecorator(Roles.ADMIN)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:ObjectId,@Body() body:UpdateUserDto){
        return this.userService.update(id,body)
    }
    
    @RolesDecorator(Roles.ADMIN)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:ObjectId){
        return this.userService.delete(id)
    }

    @RolesDecorator(Roles.ADMIN)
    @Post('register')
    async register(@Body() body:CreateUserDto){
        return this.userService.post(body)
    }

    @Public()
    @Post('login')
    async login(@Body() body:LoginUserDto){
       // res.header('Authorization', `Bearer ${token}`);
       //ANTES DE ENVIAR AL FRONT  OBTENER EL TOKEN Y ENVIAR EL TOKEN EN LOS HEADERS

        return this.userService.login(body)
    }


    /* ENTERPRISE */
/*     @RolesDecorator(Roles.ADMINCUSTOMER)
    @Get('/enterprise')
    async getByEnterprise(@Param('id') id:ObjectId){
        return this.userService.getByEnterprise(id)
    } */
    @RolesDecorator(Roles.ADMINCUSTOMER)
    @Get(':id/enterprise')
    async getIdByEnterprise(@Param('id') id:ObjectId,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.getIdByEnterprise(id,token)
    }

    @RolesDecorator(Roles.ADMINCUSTOMER)
    @Post('/enterprise')
    async postByEnterprise(@Body() body:CreateUserDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.postByEnterprise(body,token)
    }

    @RolesDecorator(Roles.ADMINCUSTOMER)
    @Put(':id/enterprise')
    async updateByEnterprise(@Param('id') id:ObjectId,@Body() body:UpdateUserDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.updateByEnterprise(id,body,token)
    }

    @RolesDecorator(Roles.ADMINCUSTOMER)
    @Delete(':id/enterprise')
    async deleteByEnterprise(@Param('id') id:ObjectId,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.deleteByEnterprise(id,token)
    } 
  
}
