import { Body, Controller, Get, Param, ParseIntPipe, Post,Put,Delete, UseGuards } from '@nestjs/common';
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

    @Get(':id')
    async getId(@Param('id', ParseIntPipe) id:ObjectId){
        return this.userService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:ObjectId){
        return this.userService.getByEnterprise(id)
    }

    @Post()
    async post(@Body() body:CreateUserDto){
        return this.userService.post(body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:ObjectId,@Body() body:UpdateUserDto){
        return this.userService.update(id,body)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:ObjectId){
        return this.userService.delete(id)
    }

    @Post('register')
    async register(@Body() body:CreateUserDto){
        return this.userService.post(body)
    }

    @Public()
    @Post('login')
    async login(@Body() body:LoginUserDto){
        return this.userService.login(body)
    }
}
