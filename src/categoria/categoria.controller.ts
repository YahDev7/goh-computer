import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';
import { ObjectId } from 'mongodb';

@Controller('categoria')
export class CategoriaController {
    constructor(
        private categoriaService:CategoriaService
    ){}

    @Get()
    async get(){
        return this.categoriaService.get()
    }

 /*    @Get(':id')
    async getId(@Param('id') id:ObjectId){
        return this.categoriaService.getId(id)
    } */

    @Get('/enterprise/:id')
    async getByIdByEnterprise(@Param('id') id:ObjectId){
        return this.categoriaService.getByEnterprise(id)
    }
    @Post()
    async post(@Body() body:CategoriaDto){
        return this.categoriaService.post(body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:UpdateCategoriaDto){
        return this.categoriaService.update(id,body)
    }
    @Delete(':id')
    async delete(@Param('id') id){
        return this.categoriaService.delete(id)
    }
    @Delete('/deleteimg/:id')
    async deleteimg(@Param('id') id){
        return this.categoriaService.deleteImg(id)
    }

   @Get()
    async getByEnterprise(){
        return this.categoriaService.get()
    }

    @Get('/gohcomputer/all')
    async getcatGoh() {
        return this.categoriaService.get()
    }

    @Get('/gohcomputer/onecat/:id')
    async getonecat(@Param('id') id:ObjectId) {
        return this.categoriaService.getId(id)
    }
    

    /* ENTERPRISE */
    @Get('enterprise')
    async GetByEnterprise(@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.categoriaService.getByEnterprise(token)
    }
    @Post('enterprise')
    async postByEnterprise(@Body() body:CategoriaDto ,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.categoriaService.postByEnterprise(body,token)
    }
    
}
