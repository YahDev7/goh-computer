import { Body, Controller,Get, Post,Put,Param,UseGuards, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto, UpdateProductDto } from './dto/products.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Public } from 'src/user/decorators/public.decorator';

@UseGuards(JwtUserAuthGuard/* ,RolesGuard */)

@Controller('products')
export class ProductsController {

    constructor(
        private productsService:ProductsService
    ){}

    @Get()
    get(){
        return this.productsService.get()
    }

    @Public()
    @Get(':id')
    getId(@Param('id') id:string ){
        return this.productsService.getId(id)
    }
    @Public()
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id') id:ObjectId){
        return this.productsService.getByEnterprise(id)
    }
    @Post()
    post(@Body() body/* :ProductDto */){
        return this.productsService.save(body)
    }

    @Put(':id')
    update(@Param('id') id:number , @Body() body/* :UpdateProductDto */){ //crear nuevamente para poder utilizar ese DTO falla en valdiar
        return this.productsService.update(id,body)
    }
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.productsService.delete(id)
    }




    /* GOHCOMPUTER */
    @Public()
    @Get('/gohcomputer/main')
    getMain(){
        return this.productsService.getMain()
    }
    @Public()
    @Get('/gohcomputer/search/:search')
    search(@Param('search') search :string){
        return this.productsService.search(search)
    }

    @Public()
    @Get('/gohcomputer/allpromo')
    getAll(){
        return this.productsService.getPromo()
    }

    @Public()
    @Get('/gohcomputer/destacados')
    getDestacados(){
        return this.productsService.getDestacados()
    }

    @Public()
    @Get('/gohcomputer/news')
    getNews(){
        return this.productsService.getNews()
    }

    @Public()
    @Get('/gohcomputer/getByIdProd/:id')
    getByIdProd(@Param('id') id :ObjectId){
        return this.productsService.getByIdProd(id)
    }

    @Public()
    @Get('/gohcomputer/getBySubcat/:id')
    getBySubcat(@Param('id') id :string){
        return this.productsService.getBySubcat(id)
    }

    /* ENTERPRISE */

    @Public()
    @Post('/enterprise')
    postEnterprise(@Body() body:ProductDto){
        return this.productsService.saveEnterprise(body)
    }
}
