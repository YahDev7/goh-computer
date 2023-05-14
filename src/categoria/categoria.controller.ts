import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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

    @Get(':id')
    async getId(@Param('id') id:ObjectId){
        return this.categoriaService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id') id:ObjectId){
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



    @Get('/gohcomputer/all')
    async getcatGoh() {
        return this.categoriaService.get()
    }

    @Get('/gohcomputer/onecat/:id')
    async getonecat(@Param('id') id:ObjectId) {
        return this.categoriaService.getId(id)
    }
    

    
}
