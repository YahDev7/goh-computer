/* import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { DepositoPed, DepositoPedDocument } from './schema/deposito-ped.schema';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { DepositoPedDto } from './dto/deposito-ped.dto';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class DepositoPedService {
    constructor(
        @InjectModel(DepositoPed.name) private DepositoPeModule:Model<DepositoPedDocument> ,
        private EnterpriseService:EnterpriseService,
        private CustomerService:CustomerService,
    ){}

    async get():Promise<DepositoPed[]|HttpException>{
        try {
            const res=await this.DepositoPeModule.find();
            if(res.length===0) return new HttpException('No hay depostios que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }


    async getId(id:string):Promise<DepositoPed|HttpException>{
        try {


            let found=await this.DepositoPeModule.findOne({_id:id});
            if(!found) return new HttpException('No se encontro deposito',HttpStatus.NOT_FOUND); 

            return found
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar'+error,HttpStatus.NOT_FOUND) 
        }
    }
    async getByEnterprise(enterprise_id:number):Promise<DepositoPed[]|HttpException>{
        try {
            let res =await this.EnterpriseService.getId(enterprise_id);
            if(res instanceof HttpException) throw res

            const found=await this.DepositoPeModule.find({where:{enterprise_id,estado:'A'}})
            if(found.length===0) throw {err:true,message:'No se encontraron deepositos'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }

    async save(body:DepositoPedDto):Promise<DepositoPed|Object>{
        try {
           let {id_pedido} =body
            id_pedido=new ObjectId(id_pedido)

            const save=await this.DepositoPeModule.create({...body,id_pedido});
            if(!save) throw {err:true,message:'No se guardardo'}
            return {err:false,message:"Se guardo con éxito"}
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND); 
        }
    }

    async getByCustomer(cutomer_id:number):Promise<DepositoPed[]|HttpException>{
        try {
            let res =await this.CustomerService.getId(cutomer_id);
            if(res instanceof HttpException) throw res

            let res2= await this.DepositoPeModule.aggregate([
                {
                  $match: {
                    _id:new ObjectId(cutomer_id),
                    estado: 'A',
                    ventas: { $gt: 0 }
                  }
                },
                {
                  $lookup: {
                    from: 'documento',
                    localField: 'id_pedido',
                    foreignField: '_id',
                    as: 'doc'
                  }
                },
                {
                  $project: {
                    _id:0,
                    iddoc: '$doc._id',
                    user_id:{$arrayElemAt: ['$doc.user_id', 0]},
                    iddeposito:{$arrayElemAt: ['$_id', 0]},
                    nro_operacion: 1,
                    metodo_pago: 1,
                    estado: 1,
                    fecha_deposito: 1,
                    monto_deposito:1 ,
                  }
                },
              ]);
            if(res2.length===0) throw {err:true,message:"No hay depositos a mostrar"}
            return res2


        } catch (error) {
            return new HttpException('Ocurrio un error '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }


}
 */