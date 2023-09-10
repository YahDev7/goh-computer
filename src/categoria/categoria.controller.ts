import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Public } from 'src/user/decorators/public.decorator';
import { RolesDecorator } from 'src/user/decorators/roles.decorator';
import { Roles } from 'src/constants/roles';

@UseGuards(JwtUserAuthGuard,RolesGuard)
@Controller('categoria')
export class CategoriaController {
    constructor(
        private categoriaService:CategoriaService
    ){}

    @Public()
    @Get()
    async get(){
        return this.categoriaService.get()
    }

 /*    @Get(':id')
    async getId(@Param('id') id:ObjectId){
        return this.categoriaService.getId(id)
    } */

   /*  @Get('/enterprise/:id')
    async getByIdByEnterprise(@Param('id') id:ObjectId){
        return this.categoriaService.getByEnterprise(id)
    } */
   /*  @Post()
    async post(@Body() body:CategoriaDto){
        return this.categoriaService.post(body)
    } */

 /*    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:UpdateCategoriaDto){
        return this.categoriaService.update(id,body)
    } */
  /*   @Delete(':id')
    async delete(@Param('id') id){
        return this.categoriaService.delete(id)
    } */
    @RolesDecorator(Roles.ADMIN)
    @Delete('/deleteimg/:id')
    async deleteimg(@Param('id') id){
        return this.categoriaService.deleteImg(id)
    }

   @Get()
    async getByEnterprise(){
        return this.categoriaService.get()
    }

    @Public()
    @Get('/gohcomputer/all')
    async getcatGoh() {
        return this.categoriaService.get()
    }

    @Public()
    @Get('/gohcomputer/onecat/:id')
    async getonecat(@Param('id') id:ObjectId) {
        return this.categoriaService.getId(id)
    }
    

    /* ENTERPRISE */
    @RolesDecorator(Roles.ADMIN)
    @Get('enterprise')
    async GetByEnterprise(@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.categoriaService.getByEnterprise(token)
    }
    @RolesDecorator(Roles.ADMIN)
    @Get('enterprise/:id')
    async GetByEnterpriseById(@Param('id') id:ObjectId,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.categoriaService.getByEnterpriseId(id,token)
    }
    @RolesDecorator(Roles.ADMIN)
    @Post('enterprise')
    async postByEnterprise(@Body() body:CategoriaDto ,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.categoriaService.postByEnterprise(body,token)
    }
    @RolesDecorator(Roles.ADMIN)
    @Put('enterprise/:id')
    async putByEnterprise(@Param('id') id:ObjectId,@Body() body:CategoriaDto ,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.categoriaService.updateByEnterprise(id,body,token)
    }
    @RolesDecorator(Roles.ADMIN)
    @Delete('enterprise/:id')
    async delete(@Param('id') id:ObjectId,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.categoriaService.deleteByEnterprise(id,token)
    }
}
