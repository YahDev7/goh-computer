import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ComprobanteService } from './services/Comprobante.service';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { ObjectId } from 'mongodb';
import { Public } from 'src/user/decorators/public.decorator';

@UseGuards(JwtUserAuthGuard,RolesGuard)
@Controller('Comprobante')
export class ComprobanteController {
    constructor(
        private ComprobanteService:ComprobanteService,
    ){}

    @Public()
    @Get('/')
    async get(){
        return this.ComprobanteService.get()
    }

    @Public()
    @Get('/:id')
    async getByIdComprobante(@Param('id') id:ObjectId){
        console.log(id)
        return this.ComprobanteService.getId(id)
    }

     @Post('/')
    async post(@Req() req,@Body() body){
        let resComprobante= await this.ComprobanteService.post_Comprobante(req.user,body)
        return resComprobante;
    } 
      @Put('/:id')
    async put(@Param('id') id, @Body() body){
        let resComprobante= await this.ComprobanteService.update_Comprobante(id,body)
        return resComprobante;
    } 

    @Public()
    @Delete('/Comprobante/delete/:id')
    async deleteComprobante(@Param("id") id:ObjectId){
            return this.ComprobanteService.delete(id)
    } 

    
}