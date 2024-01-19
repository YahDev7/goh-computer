import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LibroRecla, LibroReclaDocument } from './schema/libro_recla.shema';
import { Model } from 'mongoose';
//import { EnterpriseService } from 'src/enterprise/enterprise.service';

@Injectable()
export class LibroReclaService {
    constructor(
        @InjectModel(LibroRecla.name) private LibroReclaModule: Model<LibroReclaDocument>,
       /*  private EnterpriseService: EnterpriseService, */

    ) { }

    async getByEnterprise() {
        try {
            let res = await this.LibroReclaModule.find()
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar imagenes' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async getByIdEnterprise(id) {
        try {
            let res = await this.LibroReclaModule.findOne({_id:id})
            if(!res) throw {err:true,message:"No se encontro el registro"}
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar imagenes' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async saveByEnterprise(body){
        try {
            let save = await this.LibroReclaModule.create(body)
            if (!save) throw { err: true, message: 'No se guardardo' }
            return save

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }
}
