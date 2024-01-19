import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { ObjectId } from 'mongodb';
import { Images, ImagesDocument } from './schema/images.schema';

@Injectable()
export class ImagesService {

    constructor(
        @InjectModel(Images.name) private ImagesModule: Model<ImagesDocument>,
        private jwtService: JwtService,
        private EnterpriseService: EnterpriseService,

    ) { }

    async getByEnterprise(body) {
        try {
            let res = await this.ImagesModule.find({estado:"A"})
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar imagenes' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async getByIdEnterprise(id) {
        try {
            let res = await this.ImagesModule.findOne({_id:id,estado:"A"})
            if(!res) throw {err:true,message:"No se encontro el registro"}
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar imagenes' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async getByLabelEnterprise(body) {
        try {
            let res = await this.ImagesModule.findOne({label:{ $in: [body.label],}})
            if(!res) return []
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar imagenes' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async saveByEnterprise(dataimg,body) {
        try {
            let newBody= {public_id: dataimg.public_id,secure_url:dataimg.secure_url,...body,estado:"A"}
            let save = await this.ImagesModule.create(newBody)
            if (!save) throw { err: true, message: 'No se guardardo' }
            return save

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async updateByEnterprise(id:ObjectId,body) {
        try {
            console.log(body)
        const update=await this.ImagesModule.updateOne({_id:id}, { $set: { label:body } });
            if(update.modifiedCount===0) throw new HttpException('ocurrio un error al eliminar',HttpStatus.NOT_FOUND); 
        return {err:false,message:'Enterprise eliminado'}
        } catch (error) {
            throw new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async deleteByEnterprise(id:ObjectId) {
        try {
        const update=await this.ImagesModule.updateOne({_id:id}, { $set: { estado: 'D' } });
            if(update.modifiedCount===0) throw new HttpException('ocurrio un error al eliminar',HttpStatus.NOT_FOUND); 
        return {err:false,message:'Enterprise eliminado'}
        } catch (error) {
            throw new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }
}
