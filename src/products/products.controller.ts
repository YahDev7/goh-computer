import { Body, Controller, Get, Post, Put, Param, UseGuards, Delete, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto, ProductServiceDto, UpdateProductDto, UpdateProductServiceDto } from './dto/products.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { Public } from 'src/user/decorators/public.decorator';
import { RolesDecorator } from 'src/user/decorators/roles.decorator';
import { Roles } from 'src/constants/roles';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtUserAuthGuard, RolesGuard)

@Controller('products')
export class ProductsController {

    constructor(
        private productsService: ProductsService
    ) { }


    /* ENTERPRISE */
    @RolesDecorator(Roles.COMUN)
    @Get('enterprise')
    getEnterprise(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.productsService.getByEnterprise(token)
    }
    @RolesDecorator(Roles.COMUN)
    @Get('/enterprise/getone/:id')
    async getByEnterprise(@Param('id') id: ObjectId, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.productsService.getByEnterpriseById(id, token)
    }
    /*    @RolesDecorator(Roles.ADMIN)
       @Get('/enterprise/service/getone/:id')
       async getByEnterpriseService(@Param('id') id:ObjectId,@Req() req){
           const token = req.headers.authorization.split(' ')[1];
           return this.productsService.getByEnterpriseByIdService(id,token)
       } */
    @RolesDecorator(Roles.COMUN)
    @Post('/enterprise/save')
    postEnterprise(@Body() body: ProductDto) {
        return this.productsService.saveEnterprise(body)
    }

    @RolesDecorator(Roles.COMUN)
    @Post('/enterprise/save/img')
    postEnterpriseWithImg(@Body() body: ProductDto) {
        return this.productsService.saveEnterpriseWithImg(body)
    }

    @RolesDecorator(Roles.COMUN)
    @Post('/enterprise/save/service')
    postEnterpriseService(@Body() body: ProductServiceDto) {
        return this.productsService.saveEnterpriseService(body)
    }
    @RolesDecorator(Roles.COMUN)
    @Put('/enterprise/update/:id')
    putEnterprise(@Param('id') id: ObjectId, @Body() body: UpdateProductDto) {
        return this.productsService.updateEnterprise(id, body)
    }
    @RolesDecorator(Roles.COMUN)
    @Put('/enterprise/update/img/:id')
    putEnterpriseImg(@Param('id') id: ObjectId, @Body() body: UpdateProductDto) {
        return this.productsService.updateEnterpriseImg(id, body)
    }

    @RolesDecorator(Roles.COMUN)
    @Put('/enterprise/update/service/:id')
    putEnterpriseService(@Param('id') id: ObjectId, @Body() body: UpdateProductServiceDto) {
        return this.productsService.updateEnterpriseService(id, body)
    }
    @RolesDecorator(Roles.COMUN)
    @Post('enterprise/stock/:id')
    disminuirStock(@Body() body, @Param('id') id, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.productsService.disminuirStock(id, token, body)
    }
    @RolesDecorator(Roles.COMUN)
    @Delete('/enterprise/delete/:id')
    async DeleteByEnterprise(@Param('id') id: ObjectId, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.productsService.delete(id, token)
    }
    @RolesDecorator(Roles.COMUN)
    @Get('enterprise/withstock')
    getEnterpriseWithStock(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.productsService.getByEnterpriseWithStock(token)
    }

    @RolesDecorator(Roles.COMUN)
    @Get('enterprise/all')
    getEnterpriseAll(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.productsService.getByEnterpriseAll(token)
    }
    @RolesDecorator(Roles.COMUN)
    @Get('enterprise/cantidad')
    getEnterpriseCantidad(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.productsService.getByEnterpriseCantidad(token)
    }
    @Public()
    @Get('enterprise/getBySubcat/:id')
    getEnterpriseBySubCatWeb(@Param('id') id, @Req() req) {
        //  const token = req.headers.authorization.split(' ')[1];
        return this.productsService.getEnterpriseBySubCatWeb(id/* ,token */)
    }
    @RolesDecorator(Roles.COMUN)
    @Post('/enterprise/img')
    async DeleteByEnterpriseOneImg(/* @Param('id') id:ObjectId */@Body() body, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.productsService.deleteOneImg(token, body)

    }



    /* GOHCOMPUTER */
    @Public()
    @Get('/gohcomputer/main')
    getMain() {
        return this.productsService.getMain()
    }
    @Public()
    @Get('/gohcomputer/search/:search')
    search(@Param('search') search: string) {
        return this.productsService.search(search)
    }

    @Public()
    @Get('/gohcomputer/destacados')
    getDestacados() {
        return this.productsService.getDestacados()
    }

    @Public()
    @Get('/gohcomputer/news')
    getNews() {
        return this.productsService.getNews()
    }

    @Public()
    @Get('/gohcomputer/getByIdProd/:id')
    getByIdProd(@Param('id') id: ObjectId) {
        return this.productsService.getByIdProd(id)
    }

    @Public()
    @Get('/gohcomputer/getBySubcat/:id')
    getBySubcat(@Param('id') id: string) {
        return this.productsService.getBySubcat(id)
    }


}
