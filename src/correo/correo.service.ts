import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CorreoService {
    constructor(private mailerService: MailerService) {}

    async sendMail(body) {
        const {formData,itemsCarr}=body;

        let total = itemsCarr.reduce((accumulator, item) => accumulator + item.importe, 0);
        let res =await this.mailerService.sendMail({
            to: `gohcomputertechnology@gmail.com`,
            from:`tecnologiagoh@gmail.com`,
            subject: 'Confrimacion de carrito',
           // html:`<h2>hola</h2>`,
            template: 'email',
            context: {
                carrito:itemsCarr,
                customer:formData,
                total
            }
        })
    }
}