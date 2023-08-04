import { Body, Controller,Req, Delete, Get, Param, ParseIntPipe, Post,UseGuards, Put } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubCategoriaDto, UpdateSubCategoriaDto } from './dto/subcategoria.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';

//@UseGuards(JwtUserAuthGuard)

@Controller('subcategoria')
export class SubcategoriaController {

    constructor(
        private subcategoriaService:SubcategoriaService 
    ){}

    @Get()
    async get(){
        return this.subcategoriaService.get()
    }

  /*   @Get(':id')
    async getId(@Param('id', ParseIntPipe) id:string){
        return this.subcategoriaService.getId(id)
    } */

  /*   @Get('/enterprise/:id')
    async getByEnterprise(@Param('id') id:ObjectId){
        return this.subcategoriaService.getByEnterprise(id)
    } */

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


    @Get('/enterprise')
    async getByEnterprise(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.subcategoriaService.getByEnterprise(token)
    }
    @Post('enterprise')
    async postByEnterprise(@Body() body:SubCategoriaDto ,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.subcategoriaService.postByEnterprise(body,token)
    }

    /* GOH */
    @Get('/gohcomputer/bycategoria/:idcat')
    async getBycat(@Param('idcat') idcat:string) {
        return this.subcategoriaService.getBycat(idcat)
    }
  
}
