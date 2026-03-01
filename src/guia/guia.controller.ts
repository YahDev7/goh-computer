import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { GuiaService } from './services/guia.service';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { ObjectId } from 'mongodb';
import { EquipoService } from 'src/equipos/equipos.service';
import { Public } from 'src/user/decorators/public.decorator';

@UseGuards(JwtUserAuthGuard,RolesGuard)
@Controller('guia')
export class GuiaController {
    constructor(
        private GuiaService:GuiaService,
         private GuiaEquipoService:EquipoService, 
    ){}

    @Public()
    @Get('/enterprise')
    async get(){
        return this.GuiaService.get()
    }
    @Get('/enterprise/equipos/:id')
    async getByGuia(@Param('id') id:ObjectId){
        return this.GuiaEquipoService.getByGuia(id)
    }

    @Get('/enterprise/byidguia/:id')
    async getByIdGuia(@Param('id') id:ObjectId){
        return this.GuiaService.getId(id)
    }

    @Get('/enterprise/:id')//asdasdasdasd
    async getId(@Param('id') id:ObjectId){
        return this.GuiaEquipoService.getId(id)
    }
     @Post('/enterprise')
    async post(@Req() req,@Body() body){
        let resGuia= await this.GuiaService.post_guia(req.user,body)
        return this.GuiaEquipoService.post_equipo(resGuia["_id"])
    } 

    @Public()
    @Post('/enterprise/equipo/create/:id')
    async postEquippo(@Param("id") id){
        return this.GuiaEquipoService.post_equipo(id)
    } 

    @Put('/enterprise/equipo/:id')//asdasdadasd
    async putInfo(@Param('id') id ,@Body() body){
            return this.GuiaEquipoService.putInformacion(id,body)
    } 

    @Put('/enterprise/equipo/diagnostico/:id')
    async putDiag(@Param('id') id ,@Body() body){
            return this.GuiaEquipoService.putDiagnostico(id,body)
    } 

    @Put('/enterprise/equipo/cotizacion/:id')
    async putCoti(@Param('id') id ,@Body() body){
            return this.GuiaEquipoService.putcotizacon(id,body)
    } 

    @Put('/enterprise/equipo/pruebas_finales/:id')
    async putPruebas_finales(@Param('id') id ,@Body() body){
            return this.GuiaEquipoService.putPruebasfinales(id,body)
    } 

    @Delete('/enterprise/delete/equipo/:id')
    async delete(@Param("id") id:ObjectId){
            return this.GuiaEquipoService.delete(id)
    } 

    @Public()
    @Delete('/enterprise/guia/delete/:id')
    async deleteGuia(@Param("id") id:ObjectId){
            return this.GuiaService.delete(id)
    } 

    
}

/* {
	"tipo": "laptop",
	"modelo": "thinbook",
"comentario_cliente":"no enciende  de la nada",
"observaciones":"no dejo nada",
"reparacion_otro":false,
"tiempo_uso":"1 año"
}


 */