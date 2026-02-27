import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comprobante, ComprobanteDocument, } from '../schema/schema.Comprobante';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Console } from 'console';


@Injectable()
export class ComprobanteService {
    constructor(
        @InjectModel(Comprobante.name) private ComprobanteModule: Model<ComprobanteDocument>,
        /*  @InjectRepository(Customer)
         private CustomerModule:Repository<Customer>, */
    ) { }

    async get()/* : Promise<Comprobante[] | HttpException>  */ {
        try {
            let res = await this.ComprobanteModule.aggregate([
                /*     {
                      $match: {
                        enterprise_id: new ObjectId("6463b7176f62eabdc5d7329d")
                      }
                    }, */
                {
                    $lookup: {
                        from: 'customers',
                        localField: 'customer_id',
                        foreignField: '_id',
                        as: 'cust'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        cliente: { $arrayElemAt: ['$cust.nombres', 0] },
                        telefono: { $arrayElemAt: ['$cust.telefono', 0] },
                        estado: 1,
                        modelo: 1,
                        imei: 1,
                        estado_recibido: 1,
                        contra_pin: 1,
                        problema: 1,
                        componentes_testeados: 1,
                        total: 1,
                        pagado: 1,
                        metodo_pago: 1,
                        observaciones: 1,
                        inversion: 1,
                        tecnico: 1,
                        fecha: 1
                    }
                },
                {
                    $sort: { fecha: -1 }
                },
            ])
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async getId(id)/* : Promise<Comprobante[] | HttpException>  */ {
        try {
            let res = await this.ComprobanteModule.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'customers',
                        localField: 'customer_id',
                        foreignField: '_id',
                        as: 'cust'
                    }
                },

                {
                    $project: {
                        cliente: { $arrayElemAt: ['$cust.nombres', 0] },
                        telefono: { $arrayElemAt: ['$cust.telefono', 0] },
                        estado: 1,
                        modelo: 1,
                        imei: 1,
                        estado_recibido: 1,
                        contra_pin: 1,
                        problema: 1,
                        componentes_testeados: 1,
                        total: 1,
                        pagado: 1,
                        metodo_pago: 1,
                        observaciones: 1,
                        inversion: 1,
                        tecnico: 1,
                        fecha: 1
                    }
                },

            ])
            console.log(res)
            return res[0]
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async post_Comprobante(dataUser, body) {
        try {
            const { customer_id } = body
            let { usuario_id, enterprise_id } = dataUser

            let insert = await this.ComprobanteModule.create({ customer_id: new ObjectId(customer_id), enterprise_id: new ObjectId(enterprise_id), usuario_id: new ObjectId(usuario_id) })
            if (!insert) throw { err: true, message: "ocurrio un error al guardar la Comprobante" }
            return insert
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async update_Comprobante(comprobante_id, body) {
        try {
            console.log(body)
            console.log(comprobante_id)
            let {fecha_retiro}=body
      const update = await this.ComprobanteModule.updateOne({ _id: new ObjectId(comprobante_id) }, { $set: body  });
            console.log(update)
      if (update.modifiedCount === 1) return { status: "ok" }
      if (update.modifiedCount === 0) return { status: "ok" }

      return
            //if (!insert) throw { err: true, message: "ocurrio un error al guardar la Comprobante" }
            //return insert
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async delete(Comprobante_id)/* :Promise<Comprobante | Object>  */ {
        try {
            let found = await this.ComprobanteModule.find({ _id: Comprobante_id });
            if (!found) return new HttpException('No se encontro registro a eliminar', HttpStatus.NOT_FOUND);

            let est = await this.ComprobanteModule.find({ _id: Comprobante_id, estado: 'D' });
            if (est.length >= 1) return new HttpException('No se encontro registro a eliminar', HttpStatus.NOT_FOUND)

            //const update = await this.ComprobanteModule.updateOne({ _id: Comprobante_id }, { $set: { estado: 'D' } });
            //if (!update) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);
            const deleteOne = await this.ComprobanteModule.deleteOne({ _id: Comprobante_id });
            if (deleteOne.deletedCount !== 1) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);
            if (deleteOne.deletedCount === 1) return { status: "ok" }
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
}
