import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { MovimientoM, MovimientoMDocument } from './schema/movimiento-m.schema';
import { CustomerService } from 'src/customer/customer.service';
import { MovimientoMDto } from './dto/movimiento-m.dto';
import { DocumentoService } from 'src/documento/documento.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MovimientoMService {
    constructor(
        @InjectModel(MovimientoM.name) private MovimientoModule: Model<MovimientoMDocument>,
        private EnterpriseService: EnterpriseService,
        private DocumentoService: DocumentoService,
        private CustomerService: CustomerService,
        private jwtService: JwtService,

    ) { }

    async get(): Promise<MovimientoM[] | HttpException> {
        try {
            const res = await this.MovimientoModule.find();
            if (res.length === 0) return new HttpException('No hay depostios que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar movimientos', HttpStatus.NOT_FOUND)
        }
    }


    async getId(id: string): Promise<MovimientoM | HttpException> {
        try {

            /*        let est= await this.MovimientoModule.findOne({_id:id,estado:'D'});
                   if(est)return new HttpException('No se encontro deposito',HttpStatus.NOT_FOUND)   
        */
            let found = await this.MovimientoModule.findOne({ _id: id });
            if (!found) return new HttpException('No se encontro deposito', HttpStatus.NOT_FOUND);

            return found
        } catch (error) {
            return new HttpException('Ocurrio un error al listar por id' + error, HttpStatus.NOT_FOUND)
        }
    }
    async getByEnterprise(token): Promise<MovimientoM[] | HttpException> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id } = decodedToken

            let res = await this.EnterpriseService.getId(enterprise_id);

            if (res instanceof HttpException) throw res

            const found = await this.MovimientoModule.find({ enterprise_id})
            if (found.length === 0) throw { err: true, message: 'No se encontraron depositos' }

            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id enterprise' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async save(body: MovimientoMDto): Promise<MovimientoM | Object> {
        try {
            //VALIDAR QUE EL DOCUMENTO SI EXISTA
            let { documento_id,enterprise_id } = body
            documento_id = new ObjectId(documento_id)
            enterprise_id = new ObjectId(enterprise_id)

            const save = await this.MovimientoModule.create({ ...body, documento_id,enterprise_id });
            if (!save) throw { err: true, message: 'No se guardardo' }


            const update = await this.DocumentoService.updateEstado(documento_id);
            if(update.err) throw update.message

            return { err: false, message: "Se guardo con éxito",data:save._id }
        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async saveimg( enterprise_id: ObjectId,mov_id:ObjectId ,files:Object): Promise<MovimientoM | Object> {
        try { 
          let found =await this.getByEnterprise(enterprise_id)
          if(!found) throw {err:true,message:'No se encontor esta empresa'} 
    
          let foundpro = await this.MovimientoModule.findOne({ _id: mov_id });
          if(!foundpro) throw {err:true,message:'No se encontor este producto'} 
    
        
          const update = await this.MovimientoModule.updateOne({ _id: mov_id }, { $set: {fileAdjunto:files} });
          if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);
    
          return { err: false, message: "Se actualizo con éxito" }  
         /*  if (!save) throw { err: true, message: 'No se guardardo' }
          return save */
          /* return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
          return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
      }

      async saveVentaByUserByEnterprise(token,body: MovimientoMDto) {
        try {

            const decodedToken = this.jwtService.verify(token);
            let {enterprise_id,usuario_id} =decodedToken;
            enterprise_id = new ObjectId(enterprise_id)
            usuario_id = new ObjectId(usuario_id)

            let { documento_id } = body
            documento_id = new ObjectId(documento_id)

           

         //   let { user_id, customer_id, enterprise_id } = body

            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise

           /*  let resuser = await this.UserService.getId(usuario_id)
            if (resuser instanceof HttpException) throw resuser */

           
            const save = await this.MovimientoModule.create({ ...body, documento_id,enterprise_id });
            if (!save) throw { err: true, message: 'No se guardardo' }


            const update = await this.DocumentoService.updateEstado(documento_id);
            if(update.err) throw update.message

            return { err: false, message: "Se guardo con éxito",data:save._id }

            /*  return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }




    async getByCustomer(customer_id: ObjectId): Promise<MovimientoM[] | HttpException> {
        try {
            let res = await this.CustomerService.getId(customer_id);
            if (res instanceof HttpException) throw res

            let res2 = await this.MovimientoModule.aggregate([

                {
                    $lookup: {
                        from: 'documentos',
                        localField: 'documento_id',
                        foreignField: '_id',
                        as: 'doc'
                    }
                },

                {
                    $project: {
                        _id: 0,
                        iddoc: { $arrayElemAt: ['$doc._id', 0] },
                        customer_id: { $arrayElemAt: ['$doc.customer_id', 0] },
                        enterprise_id: 1,
                        fecha: 1,
                        nro_operacion: 1,
                        metodo_pago: 1,
                        estado: 1,
                        fecha_deposito: 1,
                        monto_deposito: 1,
                        monto_pagar: 1,
                    }
                },
                {
                    $match: {
                        customer_id,
                    }
                },
            ]);
            if (res2.length === 0) throw { err: true, message: "No hay depositos a mostrar" }
            return res2


        } catch (error) {
            return new HttpException('Ocurrio un error ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }






    async getVentasIds() {
        try {
            const res = await this.MovimientoModule.find({ tipo_compra_venta: 'VENTA' }, { _id: 1 });
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {
            return
            //return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }
    async getComprasIds() {
        try {
            const res = await this.MovimientoModule.find({ tipo_compra_venta: 'COMPRA' }, { _id: 1 });
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {
            return
            //return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }
    async totalVentas() {//MAIN
        try {
            let ventasIds = await this.getVentasIds();
            let ventasIdsNew = ventasIds.map(doc => doc._id);

            let res = await this.MovimientoModule.aggregate([

                {
                    $match: {
                        _id: { $in: [new ObjectId(...ventasIdsNew)] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total_ganancia: { $sum: "$monto_pagar" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        total_ganancia: 1
                    }
                }
            ])

            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async totalCompras() {//MAIN
        try {
            let comprasIds = await this.getComprasIds();
            let comprasIdsNew = comprasIds.map(doc => doc._id);

            let res = await this.MovimientoModule.aggregate([

                {
                    $match: {
                        _id: { $in: [new ObjectId(...comprasIdsNew)] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total_ganancia: { $sum: "$monto_pagar" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        total_ganancia: 1
                    }
                }
            ])

            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }
}
