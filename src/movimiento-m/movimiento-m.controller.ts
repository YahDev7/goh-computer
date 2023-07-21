import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MovimientoMService } from './movimiento-m.service';
import { MovimientoMDto } from './dto/movimiento-m.dto';
import { ObjectId } from 'mongodb';

@Controller('movimiento-m')
export class MovimientoMController {

    constructor(
        private MovimientoMService: MovimientoMService
    ) { }

    @Get()
    get() {
        return this.MovimientoMService.get()
    }

    @Get(':id')
    getId(@Param('id') id: string) {
        return this.MovimientoMService.getId(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id') id: ObjectId) {
        return this.MovimientoMService.getByEnterprise(id)
    }

    @Get('/customer/:id')
    async getByCustomer(@Param('id') id: ObjectId) {
        return this.MovimientoMService.getByCustomer(id)
    }
    @Post('/gohcomputer/deposito')
    post(@Body() body: MovimientoMDto) {
        return this.MovimientoMService.save(body)
    }
    @Get('ventas/total')
    getSumaVenta(){
        return this.MovimientoMService.totalVentas()
    }

    @Get('Compras/total')
    getSumaCompra(){
        return this.MovimientoMService.totalCompras()
    }
    
}
