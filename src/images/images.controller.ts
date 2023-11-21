import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { RolesDecorator } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/constants/roles';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { ObjectId } from 'mongodb';
//import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@UseGuards(JwtUserAuthGuard, RolesGuard)


@Controller('images')
export class ImagesController {
    constructor(
        private ImagesService: ImagesService,
        private EnterpriseService: EnterpriseService,
       // private CloudinaryService: CloudinaryService,
    ) {}

    @RolesDecorator(Roles.COMUN)
    @Get('/enterprise')
    async getByEnterprise(@Req() req, @Body() body) {
        try {
             let { enterprise_id } = req.user
            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise 
            return this.ImagesService.getByEnterprise(body)
        } catch (error) {
            throw new HttpException('Ocurrio un error al buscar imagenes ' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    @RolesDecorator(Roles.COMUN)
    @Get('/enterprise/:id')
    async getByIdEnterprise(@Req() req, @Param("id") id) {
        try {
             let { enterprise_id } = req.user
            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise 
            return this.ImagesService.getByIdEnterprise(id)
        } catch (error) {
            throw new HttpException('Ocurrio un error al buscar imagenes ' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    @RolesDecorator(Roles.COMUN)
    @Post('/enterprise/bylabel')
    async getByLabelEnterprise(@Req() req, @Body() body) {
        try {
             let { enterprise_id } = req.user
            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise 
            return this.ImagesService.getByLabelEnterprise(body)

        } catch (error) {
            throw new HttpException('Ocurrio un error al buscar imagenes ' + error.message || error, HttpStatus.NOT_FOUND);

        }

    }

    @RolesDecorator(Roles.COMUN)
    @Put('/update/enterprise/:id')
    async UpdateEnterprise( @Body() body,@Req() req,@Param("id") id) {
        try {
            console.log(body)
            
            let { enterprise_id } = req.user

            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise 
            return this.ImagesService.updateByEnterprise(id,body.label)

        } catch (error) {
            throw new HttpException('Ocurrio un error al buscar imagenes ' + error.message || error, HttpStatus.NOT_FOUND);

        }

    } 
  /*   @RolesDecorator(Roles.COMUN)
    @Put('/update/enterprise/:id')
    async UpdateEnterprise(@Req() req, @Body() body,@Param("id") id) {
        try {
            console.log(JSON.parse(body))
             let { enterprise_id } = req.user

            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise 
            return this.ImagesService.updateByEnterprise(id,JSON.parse(body))

        } catch (error) {
            throw new HttpException('Ocurrio un error al buscar imagenes ' + error.message || error, HttpStatus.NOT_FOUND);

        }

    } */

  /*   @RolesDecorator(Roles.COMUN)
    @Post('/enterprise/save')
    async saveByEnterprise(@Req() req, @Body() body) {
        try {
            let { enterprise_id } = req.user
            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise
            
        let res= await this.CloudinaryService.uploadOnlyProductos();
            console.log(res)

          //  return this.ImagesService.saveByEnterprise(body)

        } catch (error) {
            return new HttpException('Ocurrio un error al buscar imagenes' + error.message || error, HttpStatus.NOT_FOUND);

        }

    } */

/*     @RolesDecorator(Roles.COMUN)
    @Delete('/enterprise/:id')
    @HttpCode(204)
    async deleteByEnterprise(@Param("id") id:ObjectId,@Req() req) {
        try {
            let { enterprise_id } = req.user
            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise
            
            let resdelete=await this.ImagesService.deleteByEnterprise(id)
            if(resdelete.err) throw resdelete

            
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar imagenes' + error.message || error, HttpStatus.NOT_FOUND);

        }

    } */
}
