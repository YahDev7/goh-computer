import { SendGridService } from "@anchan828/nest-sendgrid";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CorreoService {



    constructor(
        private Sendgrid: SendGridService
    ) { }

    async sendMail(body) {
        const { formData, itemsCarr } = body;

       /*  let total = itemsCarr.reduce((accumulator, item) => accumulator + item.importe, 0);
        let res = await this.Sendgrid.send({
            to: `gohcomputertechnology@gmail.com`,
            from: `tecnologiagoh@gmail.com`,
            subject: 'Confrimacion de carrito',
            // html:`<h2>hola</h2>`,
            template: 'email',
            context: {
                carrito: itemsCarr,
                customer: formData,
                total
            }
        }) */
    }

    async Mail_Libro_Reclamo(body) {
        let { email, _id, nombres, apellidos } = body
        console.log(_id, nombres, apellidos)
        let res = await this.Sendgrid.send({
            to: email,
            from: `tecnologiagoh@gmail.com`,
            subject: 'Codigo de Reclamo',
             html:`<body>
             <h2 class=" font-family: Arial, sans-serif;">Hola ${nombres}</h2>
             <p class=" font-family: Arial, sans-serif;">Tu codigo de Reclamacion es <strong>${_id}</strong></p>
             <p class=" font-family: Arial, sans-serif;">el seguimiento se hace via whatsapp:<strong>932 069 271 - 936 411 677</strong>  </strong></p>
             </body>`,
             
           /*  template: 'libroReclamacion',
            context: {
                _id, nombres, apellidos
            }
 */
        })
    }







    /*  constructor(private mailerService: MailerService) {}
 
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
     } */
}