import { Body, Controller,Get, Post,Put,Param,ParseIntPipe, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {

    constructor(
        private productsService:ProductsService
    ){}

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

    @Put(':id')
    update(@Param('id') id:number , @Body() body:ProductDto){
        return this.productsService.update(id,body)
    }
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.productsService.delete(id)
    }
}
