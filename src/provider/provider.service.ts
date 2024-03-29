import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

import { ObjectId } from 'mongodb';
import { Provider, ProviderDocument } from './schema/schema.provider';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ProviderService {

    constructor(
    @InjectModel(Provider.name) private ProviderModule:Model<ProviderDocument> ,

    /*     @InjectRepository(Provider)
        private ProviderModule:Repository<Provider>, */
        private EnterpriseService:EnterpriseService

        
        ){}
    
        async get():Promise<Provider[]|HttpException>{
            try {
                const res= await this.ProviderModule.find();
                if(res.length===0) throw {err:true,message:'No hay datos que mostrar'} 
                 return res
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
       async getId(id:ObjectId):Promise<Provider|HttpException>{
            try {
                const found=await this.ProviderModule.findOne({_id:id,estado:'A'})

                if(!found) throw {err:true,message:'error al buscar este provider'} 
                return found;
            } catch (error) {
                return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
            }
       }

       /*  async getByEnterprise(enterprise_id:number):Promise<User[]|HttpException>{
        try {
          let res =await this.EnterpriseService.getId(enterprise_id);
          console.log(res)
          if(res instanceof HttpException) throw res
           // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
    
            const found=await this.ProviderModule.find({where:{enterprise_id,estado:'A'}})
            if(found.length===0) throw {err:true,message:'No se encontro esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }
    
       async verifyUnique(param: {[key: string]: any}):Promise<User>{ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            
            const verify=await this.ProviderModule.findOne({where:param}) 
            return verify;
        } catch (error) {
            
        }
    }
    async verifyAll(body:CreateUserDto){ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const{dni,email,telefono}=body;
            const verifyNomb =await this.verifyUnique({dni})
            if(verifyNomb ) return {err:true,message:'dni utilizado'}
 
            const verifyruc=await this.verifyUnique({email}) 
            if(verifyruc) return {err:true,message:'email utilizado'}
 
            const verifyemail=await this.verifyUnique({telefono}) 
             if(verifyemail) return {err:true,message:'telefono utilizado'}

             return {err:false,message:'nice'}

        } catch (error) {
           return  error
        }
    }

    async verifyAllUpdate(body:UpdateUserDto,id:number){ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const{dni,email,telefono}=body;

            const verifyNomb =await this.verifyUnique({dni})
            if (verifyNomb) if(verifyNomb.id !== id)  return { err: true, message: 'dni utilizado' };
             
            const verifyremail=await this.verifyUnique({email,id}) 
            if(!verifyremail) if(verifyremail.id!==id) return {err:true,message:'email utilizado'}
 
            const verifytelefono=await this.verifyUnique({telefono,id}) 
             if(!verifytelefono) if(verifytelefono.id!==id)  return {err:true,message:'telefono utilizado'}

             return {err:false,message:'nice'}

        } catch (error) {
           return  error
        }
    }

       async post(body:CreateUserDto):Promise<User|Object>{
            try {
                const{enterprise_id}=body
                let resEnterprise =await this.EnterpriseService.getId(enterprise_id);
                console.log(resEnterprise)
                if(resEnterprise instanceof HttpException) throw resEnterprise

                const res=await this.verifyAll(body);
                if(res.err) throw res;

                const insert=this.ProviderModule.create(body);
                if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
                return this.ProviderModule.save(insert)
            } catch (error) {
                console.log(error)
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
            }
        }
        async update(id:number,body:UpdateUserDto ):Promise<User|HttpException>{
            try {
        
               const found=await this.ProviderModule.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor este user'} 
                const res=await this.verifyAllUpdate(body,id);
                console.log(res)
                if(res.err) throw res;
                let resUpdate=Object.assign(found,body);
                return this.ProviderModule.save(resUpdate);
            
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async delete(id:number):Promise<Object>{
            try {
                
                const found=await this.ProviderModule.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor esta empresa'} 
        
                let resUpdate=Object.assign(found,{estado:'D'});
                const resfinal= await this.ProviderModule.save(resUpdate);
               
                return {err:false,message:'Enterprise eliminado'}
            } catch (error) {
                return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        
        } */
}
