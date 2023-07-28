import { Body, Controller,Get, Post,Put,Param,ParseIntPipe, Delete, Req } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoByCustomerDTO, DocumentoDTO } from './dto/documento.dto';
import { ObjectId } from 'mongodb';

@Controller('documento')
export class DocumentoController {

    constructor(
        private DocumentoService:DocumentoService
    ){}
    @Get()
    get(){
        return this.DocumentoService.getAll()
    }

    @Get('/enterprise')
    getByEnterprise(@Req() req){
        const token = req.headers.authorization.split(' ')[1];

        return this.DocumentoService.getByEnterprise(token)
    }

    @Get('/getbyenterprise/:id')
    getByEnterpriseById(@Param('id') id:ObjectId, @Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.getByEnterpriseVenta_id(id,token)
    }

    @Post('user')
    post(@Body() body:DocumentoDTO){
        return this.DocumentoService.saveVentaByUser(body)
    }

    @Post()
    postCustomer(@Body() body/* :DocumentoByCustomerDTO */){
        return this.DocumentoService.saveVentaByCustomerLogin(body)
    }

  /*   @Get('gohcomputer/getone/:id')
    GetById(@Param('id') id:ObjectId /* ){
        return this.DocumentoService.getByVenta_id(id)
    } */





   /*  @Get(':id')
    getId(@Param('id') id:string ){
        return this.DocumentoService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.DocumentoService.getByEnterprise(id)
    }
   
    
    @Get()
    get(){
        return this.DocumentoService.get()
    }

    @Get(':id')
    getId(@Param('id') id:string ){
        return this.DocumentoService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.DocumentoService.getByEnterprise(id)
    }
    @Post()
    post(@Body() body:ProductDto){
        return this.DocumentoService.save(body)
    }
    
    @Get()
    get(){
        return this.DocumentoService.get()
    }

    @Get(':id')
    getId(@Param('id') id:string ){
        return this.DocumentoService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.DocumentoService.getByEnterprise(id)
    }
    @Post()
    post(@Body() body:ProductDto){
        return this.DocumentoService.save(body)
    }

    @Post()
    post(@Body() body:ProductDto){
        return this.DocumentoService.save(body)
    } */

}
