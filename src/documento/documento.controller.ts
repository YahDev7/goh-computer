import { Body, Controller,Get, Post,Put,Param,ParseIntPipe, Delete } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoByCustomerDTO, DocumentoDTO } from './dto/documento.dto';

@Controller('documento')
export class DocumentoController {

    constructor(
        private productsService:DocumentoService
    ){}
    @Get()
    get(){
        return this.productsService.getAll()
    }
    @Post('user')
    post(@Body() body:DocumentoDTO){
        return this.productsService.saveVentaByUser(body)
    }

    @Post()
    postCustomer(@Body() body:DocumentoByCustomerDTO){
        return this.productsService.saveVentaByCustomer(body)
    }
   /*  @Get(':id')
    getId(@Param('id') id:string ){
        return this.productsService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.productsService.getByEnterprise(id)
    }
   
    
    @Get()
    get(){
        return this.productsService.get()
    }

    @Get(':id')
    getId(@Param('id') id:string ){
        return this.productsService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.productsService.getByEnterprise(id)
    }
    @Post()
    post(@Body() body:ProductDto){
        return this.productsService.save(body)
    }
    
    @Get()
    get(){
        return this.productsService.get()
    }

    @Get(':id')
    getId(@Param('id') id:string ){
        return this.productsService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.productsService.getByEnterprise(id)
    }
    @Post()
    post(@Body() body:ProductDto){
        return this.productsService.save(body)
    }

    @Post()
    post(@Body() body:ProductDto){
        return this.productsService.save(body)
    } */

}
