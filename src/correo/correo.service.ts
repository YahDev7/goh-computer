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

    async Mail_Libro_Reclamo(body) {
        let {email,_id,nombres, apellidos}=body
        console.log(_id,nombres, apellidos)
        let res =await this.mailerService.sendMail({
            to:email ,
            from:`tecnologiagoh@gmail.com`,
            subject: 'Codigo de Reclamo',
           // html:`<h2>hola</h2>`,
            template: 'libroReclamacion',
            context:  {
                _id,nombres,apellidos
            }
            
        })
    }
}