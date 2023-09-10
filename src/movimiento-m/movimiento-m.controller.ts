import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { MovimientoMService } from './movimiento-m.service';
import { MovimientoMDto, UpdateMovimientoMDto } from './dto/movimiento-m.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { RolesDecorator } from 'src/user/decorators/roles.decorator';
import { Roles } from 'src/constants/roles';
@UseGuards(JwtUserAuthGuard,RolesGuard)


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
    @RolesDecorator(Roles.ADMIN)
    @Get('/enterprise')
    async getByEnterprise(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.MovimientoMService.getByEnterprise(token)

    }
    @RolesDecorator(Roles.ADMIN)
    @Post('/enterprise')
    saveByEnterprise(@Body() body:UpdateMovimientoMDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.MovimientoMService.saveVentaByUserByEnterprise(token,body)
    }

   /*  @Get('/enterprise/:id')
    async getByEnterprise(@Param('id') id: ObjectId) {
        return this.MovimientoMService.getByEnterprise(id)
    } */

    @RolesDecorator(Roles.ADMIN)
    @Get('/customer/:id')
    async getByCustomer(@Param('id') id: ObjectId) {
        return this.MovimientoMService.getByCustomer(id)
    }

    @RolesDecorator(Roles.ADMIN)
    @Get('/enterprise/:id')
    async getById(@Param('id') id: ObjectId,@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.MovimientoMService.getId(id,token)
    }

    @RolesDecorator(Roles.ADMIN)
    @Post('/gohcomputer/deposito')
    post(@Body() body: MovimientoMDto) {
        return this.MovimientoMService.save(body)
    }
    @RolesDecorator(Roles.ADMIN)
    @Get('ventas/total')
    getSumaVenta(){
        return this.MovimientoMService.totalVentas()
    }
    @RolesDecorator(Roles.ADMIN)
    @Get('Compras/total')
    getSumaCompra(){
        return this.MovimientoMService.totalCompras()
    }
    @RolesDecorator(Roles.ADMIN)
    @Get('ventas/totaldia')
    getSumaVentadia(){
        return this.MovimientoMService.totalVentasDia()
    }
    @RolesDecorator(Roles.ADMIN)
    @Get('ventas/totalmes')
    getSumaVentames(){
        return this.MovimientoMService.totalVentasMes()
    }

    @RolesDecorator(Roles.ADMIN)
    @Get('compras/totaldia')
    getSumacompradia(){
        return this.MovimientoMService.totalComprasDia()
    }
    @RolesDecorator(Roles.ADMIN)
    @Get('compras/totalmes')
    getSumacomprames(){
        return this.MovimientoMService.totalComprasMes()
    }
    @RolesDecorator(Roles.ADMIN)
    @Get('enterprise/ingresosMensuales')
    getingresosMensuales(){
        return this.MovimientoMService.ingresosMensuales()
    }  
    
    @RolesDecorator(Roles.ADMIN)
    @Get('enterprise/servicios')
    gettotalVentasServicios(){
        return this.MovimientoMService.totalVentasServicios()
    }

  

    
    
}
