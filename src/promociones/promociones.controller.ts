import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { PromocionesDto, UpdatePromocionesDto } from './dto/promociones.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { Public } from 'src/user/decorators/public.decorator';
import { RolesDecorator } from 'src/user/decorators/roles.decorator';
import { Roles } from 'src/constants/roles';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtUserAuthGuard,RolesGuard)
@Controller('promociones')
export class PromocionesController {

    constructor(
        private PromocionesService:PromocionesService
    ){}

    @RolesDecorator(Roles.COMUN)
    @Get('enterprise')
    get(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.PromocionesService.getEnterprise(token)
    }
  
    @RolesDecorator(Roles.COMUN)
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id') id:ObjectId,@Req() req){
        const token = req?.headers?.authorization.split(' ')[1];
        return this.PromocionesService.getByEnterpriseById(id,token)
    }


    @RolesDecorator(Roles.COMUN)
    @Post('enterprise')
    postEnterprise(@Body() body:PromocionesDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.PromocionesService.saveEnterprise(body,token)
    }

    @RolesDecorator(Roles.COMUN)
    @Put('/enterprise/:id')
    putEnterprise(@Param('id') id:ObjectId,@Body() body:UpdatePromocionesDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.PromocionesService.updateEnterprise(id,body,token)
    }

    @RolesDecorator(Roles.COMUN)
    @Put('/enterprise/activar/:id')
    ActivarEnterprise(@Param('id') id:ObjectId,@Body() body:UpdatePromocionesDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.PromocionesService.activarEnterprise(id,token)
    }
    @RolesDecorator(Roles.COMUN)
    @Delete('/enterprise/:id')
    async DeleteByEnterprise(@Param('id') id:ObjectId,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.PromocionesService.delete(id,token)

    }

    @Public()
    @Get('webpromo')
    getWeb(@Req() req){ 
        //const token = req.headers.authorization.split(' ')[1];
        return this.PromocionesService.getEnterpriseWeb()
    }
    @Public()
    @Get('/promo/:id')
    async getByEnterpriseWeb(@Param('id') id:ObjectId,@Req() req){
        return this.PromocionesService.getByEnterpriseByIdWeb(id)
    }

    @RolesDecorator(Roles.COMUN)
    @Get('enterprise/getBySubcat/:id')
    getWebByCat(@Param('id') id:ObjectId,@Req() req){
        //const token = req.headers.authorization.split(' ')[1];
        return this.PromocionesService.getEnterpriseBySubCatWeb(id)
    } 

    @Public()
    @Get('/gohcomputer/allpromo')
    getAll(){
        return this.PromocionesService.getPromoAdmin()
    } 
}
