import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubCategoriaDto, UpdateSubCategoriaDto } from './dto/subcategoria.dto';


@Controller('subcategoria')
export class SubcategoriaController {

    constructor(
        private subcategoriaService:SubcategoriaService 
    ){}

    @Get()
    async get(){
        return this.subcategoriaService.get()
    }

    @Get(':id')
    async getId(@Param('id', ParseIntPipe) id:number){
        return this.subcategoriaService.getId(id)
    }

    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.subcategoriaService.getByEnterprise(id)
    }

    @Post()
    async post(@Body() body:SubCategoriaDto){
        return this.subcategoriaService.post(body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body :UpdateSubCategoriaDto){ //falta
        return this.subcategoriaService.update(id,body)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.subcategoriaService.delete(id)
    }
    @Delete('/deleteimg/:id')
    async deleteimg(@Param('id', ParseIntPipe) id:number){
        return this.subcategoriaService.deleteImg(id)
    }

}
