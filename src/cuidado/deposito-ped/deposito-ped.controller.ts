/* import { Body, Controller,Get, Post,Put,Param,ParseIntPipe, Delete } from '@nestjs/common';

import { DepositoPedService } from './deposito-ped.service';
import { DepositoPedDto } from './dto/deposito-ped.dto';

@Controller('deposito-ped')
export class DepositoPedController {
    constructor(
        private depositoService:DepositoPedService
    ){}
    
    @Get()
    get(){
        return this.depositoService.get()
    }

    @Get(':id')
    getId(@Param('id') id:string ){
        return this.depositoService.getId(id)
    }
    @Get('/bycustomer/:id')
    getByCustomer(@Param('id',ParseIntPipe) id:number ){
        return this.depositoService.getByCustomer(id)
    }
    @Get('/enterprise/:id')
    async getByEnterprise(@Param('id', ParseIntPipe) id:number){
        return this.depositoService.getByEnterprise(id)
    }
    @Post()
    post(@Body() body:DepositoPedDto){
        return this.depositoService.save(body)
    }
}
 */