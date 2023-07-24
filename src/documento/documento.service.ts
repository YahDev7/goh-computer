import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Documento, DocumentoDocument } from './schema/documento.schema';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { CustomerService } from 'src/customer/customer.service';
import { DocumentoByCustomerDTO, DocumentoCompraDTO, DocumentoDTO } from './dto/documento.dto';
import { UserService } from 'src/user/user.service';
import { ProviderService } from 'src/provider/provider.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DocumentoService {
    constructor(
        @InjectModel(Documento.name) private DocumentoModule: Model<DocumentoDocument>,
        private EnterpriseService: EnterpriseService,
        private UserService: UserService,
        private CustomerService: CustomerService,
        private ProviderService: ProviderService,
        private jwtService: JwtService,

    ) { }
    //ADMIN
    async getAll(): Promise<Documento[] | HttpException> {
        try {
            const res = await this.DocumentoModule.find();
            if (res.length === 0) return new HttpException('No hay Documentos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar', HttpStatus.NOT_FOUND)
        }
    }

    async getVentas() {
        try {
            const res = await this.DocumentoModule.find({ tipo_compra_venta: 'VENTA' });
            if (res.length === 0) return new HttpException('No hay Documentos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar', HttpStatus.NOT_FOUND)
        }
    }



    async getCompras() {
        try {
            const res = await this.DocumentoModule.find({ tipo_compra_venta: 'COMPRA' });
            if (res.length === 0) return new HttpException('No hay Documentos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar', HttpStatus.NOT_FOUND)
        }
    }



    async getByVenta_id(id: ObjectId) {
        try {
            const res = await this.DocumentoModule.findOne({ _id: id, tipo_compra_venta: 'VENTA' });

            if (!res) return new HttpException('No hay Documentos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar', HttpStatus.NOT_FOUND)
        }
    }

    async getByEnterpriseVenta_id(id: ObjectId, token) {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id } = decodedToken
            enterprise_id=new ObjectId(enterprise_id)
            const res = await this.DocumentoModule.findOne({ _id: id ,enterprise_id, tipo_compra_venta: 'VENTA' });
            if (!res) return new HttpException('No hay Documentos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar', HttpStatus.NOT_FOUND)
        }
    }

    async getByCompra_id(id: string) {
        try {
            const res = await this.DocumentoModule.findOne({ _id: id, tipo_compra_venta: 'COMPRA' });
            if (!res) return new HttpException('No hay Documentos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar', HttpStatus.NOT_FOUND)
        }
    }



    //ENTERPRISES
    async saveVentaByUser(body: DocumentoDTO) {
        try {
            let { user_id, customer_id, enterprise_id } = body

            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise

            let resuser = await this.UserService.getId(user_id)
            if (resuser instanceof HttpException) throw resuser

            let rescustomer = await this.CustomerService.getId(customer_id)
            if (rescustomer instanceof HttpException) throw rescustomer



            const save = await this.DocumentoModule.create(body);

            if (!save) throw { err: true, message: 'No se guardardo' }
            return save
            /*  return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async saveVentaByCustomerLogin(body/* : DocumentoByCustomerDTO */) {
        try {
            const { tokcarr, tokensession, subtotal,dataCustomer,metodo_pago } = body
            const decodedTokencarr = this.jwtService.verify(tokcarr);
            const decodedToken = this.jwtService.verify(tokensession);

            const { id, enterprise_id } = decodedToken

            let doc = {
                customer_id: new ObjectId(id),
                enterprise_id: new ObjectId(enterprise_id),
                tipo_documento: "Boleta",
                serie: "A00",
                nro_documento: "001",
                fecha: new Date(),
                sub_total: subtotal,
                descuento_total: 0,
                igv: 0,
                total_pagar: subtotal,
                estado: "PENDIENTE",
                tipo_compra_venta: "VENTA",
                detalle: decodedTokencarr.payload,
                metodo_pago,
                dataCustomer
            }

            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise

            let rescustomer = await this.CustomerService.getId(id)
            if (rescustomer instanceof HttpException) throw rescustomer


            const save = await this.DocumentoModule.create({ ...doc });


            if (!save) throw { err: true, message: 'No se guardardo' }
            return { err: false, message: "Guardado con exito", data: save._id }
            /*   return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async saveCompra(body: DocumentoCompraDTO) {
        //NINGUN CUSTOMER PUEDE HACER ESTO
        try {
            let { enterprise_id, provider_id } = body

            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise

            let resProvider = await this.ProviderService.getId(provider_id)
            if (resProvider instanceof HttpException) throw resProvider

            const save = await this.DocumentoModule.create(body);
            if (!save) throw { err: true, message: 'No se guardardo' }
            return save
            /*  return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async anular(id: string) {
        try {
            let res = this.DocumentoModule.find({ _id: id, estado: 'PENDIENTE' })
            if (res instanceof HttpException) throw res

            const update = await this.DocumentoModule.updateOne({ _id: id }, { $set: { estado: 'ANULADO' } });
            if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);

            return { err: false, message: "Se anulo con éxito" }

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async getByEnterprise(token /* enterprise_id: ObjectId */) {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id, id } = decodedToken
            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise

            enterprise_id =new ObjectId(enterprise_id)

            const res = await this.DocumentoModule.find({enterprise_id, customer_id:new ObjectId(id) });
            if (res.length === 0) return new HttpException('No hay Documentos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async getByDate(enterprise_id: ObjectId, fi, ff) {
        try {

            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise

            const res = await this.DocumentoModule.find({
                fecha: {
                    $gte: fi/* new Date('2023-05-01T00:00:00Z') */,
                    $lt: ff/*  new Date('2023-06-01T00:00:00Z') */
                }
            });

            if (res.length === 0) return new HttpException('No hay Documentos que mostrar en este rango de fechas', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);

        }
    }

    async getByUser(user_id: ObjectId) {//ESPECIFICAR EMPRESA
        try {

            let resUser = await this.EnterpriseService.getId(user_id)
            if (resUser instanceof HttpException) throw resUser

            const res = await this.DocumentoModule.find({ user_id });
            if (res.length === 0) return new HttpException('No hay Documentos que mostrar para este user', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async getByCustomer(customer_id: ObjectId) {//ESPECIFICAR EMPRESA
        try {

            /*  let resCustomer=await this.EnterpriseService.getId(customer_id)
             if(resCustomer instanceof HttpException) throw resCustomer */

            const res = await this.DocumentoModule.find({ customer_id });
            if (res.length === 0) return new HttpException('No hay Documentos que mostrar para este customer', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

  async updateEstado(id: ObjectId) {
        try {
            const res = await this.DocumentoModule.updateOne({ _id: id }, { $set: { estado: 'CONFIRMANDO' }} );

            if (res.modifiedCount===0) return  { err: true, message: "Ocurrio un error al cancelar el documento" }
            return { err: false, message: "CANCELADO" }
        } catch (error) {
            return  error
        }
    }



}
