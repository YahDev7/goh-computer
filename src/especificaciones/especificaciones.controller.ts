import { Body, Controller, Get, Param, ParseIntPipe, Post,Put,Delete } from '@nestjs/common';
import { EspecificacionesService } from './especificaciones.service';
import { EspecificacionesDto, UpdateEspecificacionesDto } from './dto/especificaciones.dto';

@Controller('especificaciones')
export class EspecificacionesController {
    constructor(
        private especificacionesService:EspecificacionesService
    ){}

    @Get()
    async get(){
        return this.especificacionesService.get()
    }

    @Get(':id')
    async getId(@Param('id', ParseIntPipe) id:number){
        return this.especificacionesService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.especificacionesService.getByEnterprise(id)
    }
    @Post()
    async post(@Body() body:EspecificacionesDto){
        return this.especificacionesService.post(body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body:UpdateEspecificacionesDto){
        return this.especificacionesService.update(id,body)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.especificacionesService.delete(id)
    }
}
