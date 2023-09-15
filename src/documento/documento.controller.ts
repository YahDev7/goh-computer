import { Body, Controller, Get, Post, Put, Param, ParseIntPipe, Delete, Req, UseGuards } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoByCustomerDTO, DocumentoDTO } from './dto/documento.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { RolesDecorator } from 'src/user/decorators/roles.decorator';
import { Roles } from 'src/constants/roles';
import { Public } from 'src/user/decorators/public.decorator';

@UseGuards(JwtUserAuthGuard,RolesGuard)
@Controller('documento')
export class DocumentoController {

    constructor(
        private DocumentoService: DocumentoService
    ) {}
    

    @RolesDecorator(Roles.ADMIN)
    @Get('/enterprise')
    getByEnterprise(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.getByEnterprise(token)
    }

    @RolesDecorator(Roles.ADMIN)
    @Get('/enterprise/compra')
    getByEnterpriseCompra(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.getByEnterpriseCompra(token)
    }

    @Public()
    @Get('/web/enterprise')
    getByEnterpriseWeb(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.getByEnterpriseWeb(token)
    }

    @RolesDecorator(Roles.ADMIN)
    @Post('/enterprise/user')
    saveByEnterprise(@Body() body/* :DocumentoDTO  */, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.saveVentaByUserByEnterprise(token, body)
    }

    @RolesDecorator(Roles.ADMIN)
    @Post('/enterprise/customer')
    saveByEnterpriseCustomer(@Body() body/* :DocumentoDTO  */, @Req() req) {
        // const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.saveVentaByCustomerLogin(body)
    }

    /*   @Get('/getbyenterprise/:id')
      getByEnterpriseById(@Param('id') id:ObjectId, @Req() req){
          const token = req.headers.authorization.split(' ')[1];
          return this.DocumentoService.getByEnterpriseVenta_id(id,token)
      } */

    /*    @Post('user')
       post(@Body() body:DocumentoDTO){
           return this.DocumentoService.saveVentaByUser(body)
       } */

    @RolesDecorator(Roles.ADMIN)
    @Post()
    postCustomer(@Body() body/* :DocumentoByCustomerDTO */) {
        return this.DocumentoService.saveVentaByCustomerLogin(body)
    }

    @RolesDecorator(Roles.ADMIN)
    @Post('enterprise')
    postAdmin(@Body() body, @Req() req/* :DocumentoByCustomerDTO */) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.saveVentaAdmin(body, token)
    }

    @RolesDecorator(Roles.ADMIN)
    @Post('enterprise/compra')
    postAdminCompra(@Body() body, @Req() req/* :DocumentoByCustomerDTO */) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.saveCompraAdmin(body, token)
    }
  //  @RolesDecorator(Roles.ADMIN)
    @Public()
    @Post('enterprise/anular/:id')
    anular(@Param('id') id: ObjectId, @Req() req) {
       // const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.anular(id/* , token */)
    }



    @Public()
    @Get('web/enterprise/:id')
    getByEnterpriseWebById(@Param('id') id: ObjectId, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.getByEnterpriseWebVenta_id(id, token)
    }
    @RolesDecorator(Roles.ADMIN)
    @Get('/enterprise/:id')
    getByEnterpriseById(@Param('id') id: ObjectId, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.getByEnterpriseVenta_id(id, token)
    }

    @RolesDecorator(Roles.ADMIN)
    @Get('/enterprise/compra/:id')
    getByEnterpriseByIdCompra(@Param('id') id: ObjectId, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.getByEnterpriseCompra_id(id, token)
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
