import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GenGuia, GenGuiaDocument, } from '../schema/schema.guia';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';


@Injectable()
export class GuiaService {
  constructor(
    @InjectModel(GenGuia.name) private GuiaModule: Model<GenGuiaDocument>,
    /*  @InjectRepository(Customer)
     private CustomerModule:Repository<Customer>, */

  ) { }

  async get()/* : Promise<Guia[] | HttpException>  */ {
    try {
      let res = await this.GuiaModule.aggregate([
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
            dni_ruc: { $arrayElemAt: ['$cust.dni_ruc', 0] }, 
            estado: 1,
            fecha:1
            
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

  async getId(id)/* : Promise<Guia[] | HttpException>  */ {
    try {
      let res = await this.GuiaModule.aggregate([
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
            cliente: {
              $concat: [
                { $arrayElemAt: ['$cust.nombres', 0] },
                ' ',
                { $arrayElemAt: ['$cust.ap_paterno', 0] },
                ' ',
                { $arrayElemAt: ['$cust.ap_materno', 0] }

              ]
            },
          }
        },
      
      ])   
      return res[0]
     } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }

 /*  async getId(id) {
    try {

      let res = await this.GuiaModule.aggregate([
        {
          $match: {
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
          $lookup: {
            from: 'equipos',
            localField: 'customer_id',
            foreignField: '_id',
            as: 'cust'
          }
        },

        {
          $project: {
            _id: 1,
            cliente: '$cust.nombres',
            direccion: '$cust.telefono',
            dni_ruc: '$cust.dni_ruc',
            estado: 1,
            fecha:1
            
          }
        }
      ])   
        } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  } */

  async post_guia(dataUser, body) {
    try {
      const { customer_id } = body
      let { enterprise_id, usuario_id } = dataUser
      let insert = await this.GuiaModule.create({ customer_id: new ObjectId(customer_id), enterprise_id: new ObjectId(enterprise_id), usuario_id: new ObjectId(usuario_id) })
      if (!insert) throw { err: true, message: "ocurrio un error al guardar la guia" }
      return insert
    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }

  async delete(guia_id)/* :Promise<Guia | Object>  */ {
    try {
      let found = await this.GuiaModule.find({ _id: guia_id });
      if (!found) return new HttpException('No se encontro registro a eliminar', HttpStatus.NOT_FOUND);

      let est = await this.GuiaModule.find({ _id: guia_id, estado: 'D' });
      if (est.length >= 1) return new HttpException('No se encontro registro a eliminar', HttpStatus.NOT_FOUND)

      //const update = await this.GuiaModule.updateOne({ _id: guia_id }, { $set: { estado: 'D' } });
      //if (!update) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);
      const deleteOne = await this.GuiaModule.deleteOne({ _id: guia_id });
      if (deleteOne.deletedCount !== 1) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);
      if (deleteOne.deletedCount === 1) return { status: "ok" }
    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }
}
