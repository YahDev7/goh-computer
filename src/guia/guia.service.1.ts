/* import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Guia, GuiaDocument } from './schema/schema.guia.1';

@Injectable()
export class GuiaService {
  constructor(
    @InjectModel(Guia.name) private GuiaModule: Model<GuiaDocument>,


  ) { }

  async get(): Promise<Guia[] | HttpException> {
    try {
      let res = await this.GuiaModule.aggregate([
        {
          $match: {
            estado: 'A',
            enterprise_id: new ObjectId("6463b7176f62eabdc5d7329d")
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
            _id: 1,
            cliente: '$cust.nombres',
            direccion: '$cust.direccion',
            dni_ruc: '$cust.dni_ruc',
            equipos: 1,
            fecha: 1,
            estado: 1
          }
        }
      ])

      return res
    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }

  async getId(id): Promise<Guia | HttpException> {
    try {
      let res = await this.GuiaModule.aggregate([
        {
          $match: {
            estado: 'A',
            _id: new ObjectId(id),
            enterprise_id: new ObjectId("6463b7176f62eabdc5d7329d")
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
            _id: 1,
            customer_id: { $arrayElemAt: ['$cust._id', 0] },
            direccion: { $arrayElemAt: ['$cust.direccion', 0] },
            cliente: {
              $concat: [
                { $arrayElemAt: ['$cust.nombres', 0] },
                ' ',
                { $arrayElemAt: ['$cust.ap_paterno', 0] },
                ' ',
                { $arrayElemAt: ['$cust.ap_materno', 0] }

              ]
            },
            dni_ruc: { $arrayElemAt: ['$cust.dni_ruc', 0] },
            equipos: 1,
            fecha: 1,
            estado: 1
          }
        }
      ])
      console.log(res)
      return res[0]
    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }

  async post(dataUser, body): Promise<Guia | Object> {
    try {
      const { customer_id } = body
      let { enterprise_id, usuario_id } = dataUser
      console.log(dataUser)
      let insert = await this.GuiaModule.create({ ...body, customer_id: new ObjectId(customer_id), enterprise_id: new ObjectId(enterprise_id), usuario_id: new ObjectId(usuario_id) })
      if (!insert) throw { err: true, message: "ocurrio un error al guardar la guia" }
      return insert
    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }


}
 */