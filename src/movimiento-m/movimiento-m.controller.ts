import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { MovimientoMService } from './movimiento-m.service';
import { MovimientoMDto, UpdateMovimientoMDto } from './dto/movimiento-m.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesDecorator } from 'src/user/decorators/roles.decorator';
import { Roles } from 'src/constants/roles';
import { Public } from 'src/user/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@UseGuards(JwtUserAuthGuard, RolesGuard)


@Controller('movimiento-m')
export class MovimientoMController {

    constructor(
        private MovimientoMService: MovimientoMService
    ) { }

    @Get()
    get() {
        return this.MovimientoMService.get()
    }

    /* @Get(':id')
    getId(@Param('id') id: string) {
        return this.MovimientoMService.getId(id)
    } */
    @RolesDecorator(Roles.COMUN)
    @Get('/enterprise')
    async getByEnterprise(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.MovimientoMService.getByEnterprise(token)

    }
    @RolesDecorator(Roles.COMUN)
    @Post('/enterprise')
    saveByEnterprise(@Body() body: UpdateMovimientoMDto, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.MovimientoMService.saveVentaByUserByEnterprise(token, body)
    }

    /*  @Get('/enterprise/:id')
     async getByEnterprise(@Param('id') id: ObjectId) {
         return this.MovimientoMService.getByEnterprise(id)
     } */

    @RolesDecorator(Roles.COMUN)
    @Get('/customer/:id')
    async getByCustomer(@Param('id') id: ObjectId) {
        return this.MovimientoMService.getByCustomer(id)
    }

    @RolesDecorator(Roles.COMUN)
    @Get('/enterprise/getone/:id')
    async getById(@Param('id') id: ObjectId, @Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.MovimientoMService.getId(id, token)
    }

    /*     @RolesDecorator(Roles.ADMIN) */
    @Public()
    @Post('/gohcomputer/deposito')
    post(@Body() body: MovimientoMDto) {
        return this.MovimientoMService.save(body)
    }
    @RolesDecorator(Roles.COMUN)
    @Get('ventas/total')
    getSumaVenta() {
        return this.MovimientoMService.totalVentas()
    }
    @RolesDecorator(Roles.COMUN)
    @Get('Compras/total')
    getSumaCompra() {
        return this.MovimientoMService.totalCompras()
    }
    @RolesDecorator(Roles.COMUN)
    @Get('ventas/totaldia')
    getSumaVentadia() {
        return this.MovimientoMService.totalVentasDia()
    }
    @RolesDecorator(Roles.COMUN)
    @Get('ventas/totalmes/:meses')
    getSumaVentames(@Param("meses") meses) {
        return this.MovimientoMService.totalVentasMes(meses)
    }

    @RolesDecorator(Roles.COMUN)
    @Get('compras/totaldia')
    getSumacompradia() {
        return this.MovimientoMService.totalComprasDia()
    }
    @RolesDecorator(Roles.COMUN)
    @Get('compras/totalmes/:meses')
    getSumacomprames(@Param("meses") meses) {
        return this.MovimientoMService.totalComprasMes(meses)
    }
    @RolesDecorator(Roles.COMUN)
    @Get('enterprise/ingresosMensuales')
    getingresosMensuales() {
        return this.MovimientoMService.ingresosMensuales()
    }

    @RolesDecorator(Roles.COMUN)
    @Get('enterprise/servicios')
    gettotalVentasServicios() {
        return this.MovimientoMService.totalVentasServicios()
    }


    @RolesDecorator(Roles.COMUN)
    @Get('enterprise/servicios/:mes')
    gettotalVentasServiciosMes(@Param("mes") mes) {
        return this.MovimientoMService.totalServiciosMes(mes)
    }

    @RolesDecorator(Roles.COMUN)
    @Get('enterprise/servicios/dia')
    gettotalVentasServiciosDia() {
        return this.MovimientoMService.totalServiciosDia()
    }





}
