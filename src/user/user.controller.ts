import { Body, Controller, Get, Param, ParseIntPipe, Post,Put,Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService:UserService
    ){}
    @Get()
    async get(){
        return this.userService.get()
    }

    @Get(':id')
    async getId(@Param('id', ParseIntPipe) id:number){
        return this.userService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.userService.getByEnterprise(id)
    }

    @Post()
    async post(@Body() body:CreateUserDto){
        return this.userService.post(body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:UpdateUserDto){
        return this.userService.update(id,body)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.userService.delete(id)
    }
}
