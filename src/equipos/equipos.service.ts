import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Equipos, EquiposDocument } from './schema/shema.equipos';

@Injectable()
export class EquipoService {
  constructor(
    @InjectModel(Equipos.name) private EquipoModule: Model<EquiposDocument>,
    /*  @InjectRepository(Customer)
     private CustomerModule:Repository<Customer>, */

  ) { }
  async getId(id) {
    try {
      let res = await this.EquipoModule.aggregate([
        {
          $match: {
            _id: new ObjectId(id)
          }
        },
        {
          $project: {
            _id: 1,
            nombre: 1,
            informacion_guia: 1,
            diagnostico: 1,
            cotizacion: 1,
            pruebas_finales: 1

          }
        }
      ])
      return res[0]
    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }

  }
  async getByGuia(id) {
    try {

      let res = await this.EquipoModule.aggregate([
        {
          $match: {
            guia_id: new ObjectId(id)
          }
        },
        {
          $project: {
            guia_id: 1,
            _id: 1,
            nombre: 1,
            informacion_guia: 1,
            diagnostico: 1,
            cotizacion: 1,
            pruebas_finale: 1

          }
        }
      ])
      return res
    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }

  }

  async post_equipo(guia_id)/* : Promise<Guia | Object> */ {
    try {
      let insert = await this.EquipoModule.create({ guia_id: new ObjectId(guia_id) })
      if (!insert) throw { err: true, message: "ocurrio un error al guardar la guia" }
      return insert
    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }

  async putInformacion(equipo_id, body)/* :Promise<Guia | Object>  */ {
    try {
      const update = await this.EquipoModule.updateOne({ _id: new ObjectId(equipo_id) }, { $set: { informacion_guia: body } });
      console.log(update)

      if (update.modifiedCount === 1) return { status: "ok" }
      return

    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }

  async putDiagnostico(equipo_id, body)/* :Promise<Guia | Object>  */ {

    try {
      const update = await this.EquipoModule.updateOne({ _id: equipo_id }, { $set: { diagnostico: body } });
      if (update.modifiedCount === 1) return { status: "ok" }
      return

    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }
  async putcotizacon(equipo_id, body)/* :Promise<Guia | Object>  */ {
    console.log(equipo_id, body)

    try {
      const update = await this.EquipoModule.updateOne({ _id: equipo_id }, {
        $set: {
          cotizacion: body,
        }
      });

      console.log(update)
      if (update.modifiedCount === 1) return { status: "ok" }
      return

    } catch (error) {
      console.log(error)
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }
  async putPruebasfinales(equipo_id, body)/* :Promise<Guia | Object>  */ {
    try {
      const update = await this.EquipoModule.updateOne({ _id: equipo_id }, {
        $set: {
          pruebas_finales: body
        }
      });

      if (update.modifiedCount === 1) return { status: "ok" }
      return

    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }

  async delete(equipo_id)/* :Promise<Guia | Object>  */ {
    try {
      console.log(equipo_id)
      let found = await this.EquipoModule.find({ _id: equipo_id });
      if (!found) return new HttpException('No se encontro registro a eliminar', HttpStatus.NOT_FOUND);

      const deleteOne = await this.EquipoModule.deleteOne({ _id: equipo_id });
      if (deleteOne.deletedCount !== 1) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);

      if (deleteOne.deletedCount === 1) return { status: "ok" }
    } catch (error) {
      return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
    }
  }

  

  /*   async put(dataUser,body):Promise<Guia | Object> {
        try {
            let {enterprise_id,usuario_id}=dataUser
            let insert = await this.GuiaModule.create({...body,enterprise_id,usuario_id})
            if (!insert) throw { err: true, message: "ocurrio un error al guardar la guia" }
            return insert
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    } */
}
