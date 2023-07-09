import { Body, Controller,Get, Post,Put,Param,ParseIntPipe, Delete } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoByCustomerDTO, DocumentoDTO } from './dto/documento.dto';

@Controller('documento')
export class DocumentoController {

    constructor(
        private DocumentoService:DocumentoService
    ){}
    @Get()
    get(){
        return this.DocumentoService.getAll()
    }
    @Post('user')
    post(@Body() body:DocumentoDTO){
        return this.DocumentoService.saveVentaByUser(body)
    }

    @Post()
    postCustomer(@Body() body/* :DocumentoByCustomerDTO */){
        return this.DocumentoService.saveVentaByCustomer(body)
    }





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
