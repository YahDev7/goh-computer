import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LibroReclaService } from './libro_recla.service';
import { CorreoService } from 'src/correo/correo.service';

@Controller('libro-recla')
export class LibroReclaController {

    constructor(
        private readonly LibroReclaService: LibroReclaService,
        private readonly EmailService: CorreoService
        ) { }

    @Get('/enterprise')
    async getReclamaciones() {
        const res = await this.LibroReclaService.getByEnterprise();
        return res
    }
    @Get("/enterprise/byid/:id")
    async getReclamacionesId(@Param('id') id) {
        const res = await this.LibroReclaService.getByIdEnterprise(id);
        return res
    }

    @Post('/enterprise/save')
     async postEnterprise(@Body() body) {
        let ressave=  await this.LibroReclaService.saveByEnterprise(body)
        let reemail=  await this.EmailService.Mail_Libro_Reclamo(ressave)
        return ressave
    }

}
