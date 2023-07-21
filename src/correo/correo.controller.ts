
import { Body, Controller, Post, Query } from "@nestjs/common";
import { CorreoService } from "./correo.service";

@Controller('correo')
export class CorreoController {
    constructor(private readonly CorreoService: CorreoService) {}

    @Post()
    async sendEmail(@Body() body) {
        return await this.CorreoService.sendMail(body);
    }
}   