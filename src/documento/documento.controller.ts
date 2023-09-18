import { Body, Controller, Get, Post, Put, Param, ParseIntPipe, Delete, Req, UseGuards } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoByCustomerDTO, DocumentoCompraDTO, DocumentoDTO } from './dto/documento.dto';
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


/*     @RolesDecorator(Roles.ADMIN)
    @Post('/enterprise/user')
    saveByEnterprise(@Body() body, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.saveVentaByUserByEnterprise(token, body)
    } */

    @RolesDecorator(Roles.ADMIN)
    @Post('/enterprise/customer')
    saveByEnterpriseCustomer(@Body() body:DocumentoByCustomerDTO, @Req() req) {
        // const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.saveVentaByCustomerLogin(body)
    }


    @RolesDecorator(Roles.ADMIN)
    @Post()
    postCustomer(@Body() body:DocumentoByCustomerDTO) {
        return this.DocumentoService.saveVentaByCustomerLogin(body)
    }

    @RolesDecorator(Roles.ADMIN)
    @Post('enterprise')
    postAdmin(@Body() body:DocumentoDTO, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.saveVentaAdmin(body, token)
    }

    @RolesDecorator(Roles.ADMIN)
    @Post('enterprise/compra')
    postAdminCompra(@Body() body/* :DocumentoCompraDTO */, @Req() req/* :DocumentoByCustomerDTO */) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.saveCompraAdmin(body, token)
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

  //  @RolesDecorator(Roles.ADMIN)
    @Public()
    @Post('enterprise/anular/:id')
    anular(@Param('id') id: ObjectId, @Req() req) {
       // const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.anular(id/* , token */)
    }

    @Public()
    @Post('enterprise/anular/compra/:id')
    anularCompra(@Param('id') id: ObjectId, @Req() req) {
       // const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.anularCompra(id/* , token */)
    }



    @Public()
    @Get('/web/enterprise')
    getByEnterpriseWeb(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.getByEnterpriseWeb(token)
    }


    @Public()
    @Get('web/enterprise/:id')
    getByEnterpriseWebById(@Param('id') id: ObjectId, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.DocumentoService.getByEnterpriseWebVenta_id(id, token)
    }
}
