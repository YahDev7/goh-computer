import { Body, Controller,Req, Delete, Get, Param, ParseIntPipe, Post,UseGuards, Put } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubCategoriaDto, UpdateSubCategoriaDto } from './dto/subcategoria.dto';
import { ObjectId } from 'mongodb';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Public } from 'src/user/decorators/public.decorator';
import { RolesDecorator } from 'src/user/decorators/roles.decorator';
import { Roles } from 'src/constants/roles';

//@UseGuards(JwtUserAuthGuard)
@UseGuards(JwtUserAuthGuard,RolesGuard)

@Controller('subcategoria')
export class SubcategoriaController {

    constructor(
        private subcategoriaService:SubcategoriaService 
    ){}
    @Public()
    @Get()
    async get(){
        return this.subcategoriaService.get()
    }

  /*   @Get(':id')
    async getId(@Param('id', ParseIntPipe) id:string){
        return this.subcategoriaService.getId(id)
    } */

  /*   @Get('/enterprise/:id')
    async getByEnterprise(@Param('id') id:ObjectId){
        return this.subcategoriaService.getByEnterprise(id)
    } */

    @RolesDecorator(Roles.ADMIN)
    @Post()
    async post(@Body() body:SubCategoriaDto){
        return this.subcategoriaService.post(body)
    }

    @RolesDecorator(Roles.ADMIN)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number,@Body() body :UpdateSubCategoriaDto){ //falta
        return this.subcategoriaService.update(id,body)
    }
    @RolesDecorator(Roles.ADMIN)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return this.subcategoriaService.delete(id)
    }
    @RolesDecorator(Roles.ADMIN)
    @Delete('/deleteimg/:id')
    async deleteimg(@Param('id', ParseIntPipe) id:number){
        return this.subcategoriaService.deleteImg(id)
    }


  

    /* GOH */
    @Public()
    @Get('/gohcomputer/bycategoria/:idcat')
    async getBycat(@Param('idcat') idcat:string) {
        return this.subcategoriaService.getBycat(idcat)
    }
  

    @RolesDecorator(Roles.ADMIN)
    @Get('/enterprise')
    async getByEnterprise(@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.subcategoriaService.getByEnterprise(token)
    }

    @RolesDecorator(Roles.ADMIN)
    @Get('/enterprise/:id')
    async getByEnterpriseById(@Param('id') id,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.subcategoriaService.getByEnterpriseId(id,token)
    }
    @RolesDecorator(Roles.ADMIN)
    @Post('enterprise')
    async postByEnterprise(@Body() body:SubCategoriaDto ,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.subcategoriaService.postByEnterprise(body,token)
    }
    @RolesDecorator(Roles.ADMIN)
    @Put('/enterprise/:id')
    async updateByEnterprise(@Param('id') id:ObjectId,@Body() body:UpdateSubCategoriaDto,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.subcategoriaService.updateByEnterpriseId(id,body,token)
    }
    @RolesDecorator(Roles.ADMIN)
    @Delete('enterprise/:id')
    async deleteByEnterprise(@Param('id') id:ObjectId,@Req() req){
        const token = req.headers.authorization.split(' ')[1];
        return this.subcategoriaService.deleteByEnterprise(id,token)
    } 
}
