import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { PromocionesDto, UpdatePromocionesDto } from './dto/promociones.dto';
import { ObjectId } from 'mongodb';

@Controller('promociones')
export class PromocionesController {

    constructor(
        private PromocionesService:PromocionesService
    ){}

    @Get('enterprise')
    get(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.PromocionesService.getEnterprise(token)
    }
  
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id') id:ObjectId,@Req() req){
        const token = req?.headers?.authorization.split(' ')[1];
        return this.PromocionesService.getByEnterpriseById(id,token)
    }


    @Post('enterprise')
    postEnterprise(@Body() body:PromocionesDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.PromocionesService.saveEnterprise(body,token)
    }

    @Put('/enterprise/:id')
    putEnterprise(@Param('id') id:ObjectId,@Body() body:UpdatePromocionesDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.PromocionesService.updateEnterprise(id,body,token)
    }
    @Delete('/enterprise/:id')
    async DeleteByEnterprise(@Param('id') id:ObjectId,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.PromocionesService.delete(id,token)

    }

    @Get('webpromo')
    getWeb(@Req() req){ 
        //const token = req.headers.authorization.split(' ')[1];
        return this.PromocionesService.getEnterpriseWeb()
    }
    @Get('/promo/:id')
    async getByEnterpriseWeb(@Param('id') id:ObjectId,@Req() req){
        return this.PromocionesService.getByEnterpriseByIdWeb(id)
    }

     @Get('enterprise/getBySubcat/:id')
    getWebByCat(@Param('id') id:ObjectId,@Req() req){
        //const token = req.headers.authorization.split(' ')[1];
        return this.PromocionesService.getEnterpriseBySubCatWeb(id)
    } 

    @Get('/gohcomputer/allpromo')
    getAll(){
        return this.PromocionesService.getPromoAdmin()
    } 
}
