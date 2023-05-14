import { Body, Controller,Get, Post,Put,Param,ParseIntPipe, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/products.dto';
import { ObjectId } from 'mongodb';

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
    async getByEnterprise(@Param('id') id:ObjectId){
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




    /* GOHCOMPUTER */
    @Get('/gohcomputer/main')
    getMain(){
        return this.productsService.getMain()
    }
    @Get('/gohcomputer/search/:search')
    search(@Param('search') search :string){
        console.log(search)
        return this.productsService.search(search)
    }
    @Get('/gohcomputer/allpromo')
    getAll(){
        return this.productsService.getPromo()
    }

    @Get('/gohcomputer/destacados')
    getDestacados(){
        return this.productsService.getDestacados()
    }

    @Get('/gohcomputer/news')
    getNews(){
        return this.productsService.getNews()
    }

    @Get('/gohcomputer/getByIdProd/:id')
    getByIdProd(@Param('id') id :ObjectId){
        console.log(id)
        return this.productsService.getByIdProd(id)
    }

    @Get('/gohcomputer/getBySubcat/:id')
    getBySubcat(@Param('id') id :string){
        return this.productsService.getBySubcat(id)
    }
}
