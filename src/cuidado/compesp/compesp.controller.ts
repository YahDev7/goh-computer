/* import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CompespService } from './compesp.service';
import { CompEspDto, UpdateCompEspDto } from './dto/compesp.dto';

@Controller('compesp')
export class CompespController {
    constructor(
        private CompesService:CompespService,
    ){}

    @Get()
    async get(){
        return this.CompesService.get()
    }

    @Get(':id')
    async getId(@Param('id', ParseIntPipe) id:number){
        return this.CompesService.getId(id)
    }
    @Get('/byCompId/:id')
    async getByEnterprise(@Param('id') id:string){
        return this.CompesService.getbyCompId(id)
    }
    @Post()
    async post(@Body() body:CompEspDto){
        return this.CompesService.post(body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:UpdateCompEspDto){
        return this.CompesService.update(id,body)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.CompesService.delete(id)
    }
}
 */