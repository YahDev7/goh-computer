import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

import { Products, ProductsDocument } from './schema/products.schema';
import { ProductDto } from './dto/products.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products.name) private productssModule:Model<ProductsDocument> ,
    private EnterpriseService:EnterpriseService

    ){}
  
    async get():Promise<Products[]|HttpException>{
        try {
            const res=await this.productssModule.find();
            if(res.length===0) return new HttpException('No hay productos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }

    async getId(id:string):Promise<Products|HttpException>{
        try {

            let est= await this.productssModule.findOne({_id:id,estado:'D'});
            if(est)return new HttpException('No se encontro registro',HttpStatus.NOT_FOUND)   

            let found=await this.productssModule.findOne({_id:id});
            if(!found) return new HttpException('No se encontro registro',HttpStatus.NOT_FOUND); 

            return found
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar'+error,HttpStatus.NOT_FOUND) 
        }
    }
    async getByEnterprise(enterprise_id:number):Promise<Products[]|HttpException>{
        try {
        let res =await this.EnterpriseService.getId(enterprise_id);
        console.log(res)
        if(res instanceof HttpException) throw res
        // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found=await this.productssModule.find({where:{enterprise_id,estado:'A'}})
            if(found.length===0) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }
    async save(body:ProductDto):Promise<Products|Object>{
        try {
           
            const save=await this.productssModule.create(body);
            console.log(save)
            if(!save) throw {err:true,message:'No se guardardo'}
            return {err:false,message:"Se guardo con éxito"}
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND); 
        }
    }

    async verifyUnique(param:Object):Promise<Products>{ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const verify=await this.productssModule.findOne(param) 
           console.log(verify )

            return verify;
        } catch (error) {
            
        }
    }

    async verifyAllUpdate(body:ProductDto,id:number){ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const{codfabricante,codigo}=body;
            const verifyCodFab =await this.verifyUnique({codfabricante})
           //console.log(verifyCodFab["_id"].toString()!==id )
            if (verifyCodFab) if(verifyCodFab["_id"].toString() !== id)  return { err: true, message: 'Codigo fab utilizado' };
           
            const verifycodigo= await this.verifyUnique({codigo}) 
            if (verifycodigo) if(verifycodigo["_id"].toString() !== id)  return {err:true,message:'Codigo utilizado'}
 
             return {err:false,message:'nice'} 

        } catch (error) {
           return  error
        }
    }
    async update(id:number,body:ProductDto):Promise<Products|Object>{
        try {
            
            let found=await this.productssModule.findOne({_id:id,estado:"A"});
            if(!found) return new HttpException('No existe este product',HttpStatus.NOT_FOUND); 

            let res=await this.verifyAllUpdate(body,id)
            console.log(res)
            if(res.err) throw res;

          
             const update=await this.productssModule.updateOne({_id:id}, { $set: body });
             console.log(update)
             if(update.modifiedCount===0) return new HttpException('No se logro actualizar',HttpStatus.NOT_FOUND); 

             return {err:false,message:"Se actualizo con éxito"}  
        } catch (error) {
            return new HttpException('Ocurrio un error al update, '+error.message||error,HttpStatus.NOT_FOUND); 
        }
    }
    async delete(id:string){
        try {
            let found=await this.productssModule.find({_id:id});
            if(!found) return new HttpException('No se encontro registro a eliminar',HttpStatus.NOT_FOUND); 

            let est= await this.productssModule.find({_id:id,estado:'D'});
            if(est.length>=1)return new HttpException('No se encontro registro a eliminar',HttpStatus.NOT_FOUND)     
           
        
            const update=await this.productssModule.updateOne({_id:id}, { $set: { estado: 'D' } });
            if(!update) return new HttpException('ocurrio un error al eliminar',HttpStatus.NOT_FOUND); 

            return {err:false,message:"Se elimino con éxito"}
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar, VERIFIQUE',HttpStatus.NOT_FOUND); 
        }
      
    }


}



