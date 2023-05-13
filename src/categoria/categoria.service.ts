import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria, CategoriaDocument } from './schema/categoria.schema';

@Injectable()
export class CategoriaService {
constructor(
    @InjectModel(Categoria.name) private CategoriaModule:Model<CategoriaDocument> ,
    private EnterpriseService:EnterpriseService

    ){}

    async get():Promise<Categoria[]|HttpException>{
        try {
            const res= await this.CategoriaModule.find();
            if(res.length===0) return new HttpException('No hay datos que mostrar',HttpStatus.NOT_FOUND) 
             return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
    }

    async getId(id:string):Promise<Categoria|HttpException>{
        try {
            
            let est= await this.CategoriaModule.findOne({_id:id,estado:'D'});
            if(est)return new HttpException('No se encontro registro',HttpStatus.NOT_FOUND)   

            let found=await this.CategoriaModule.findOne({_id:id});
            if(!found) return new HttpException('No se encontro registro',HttpStatus.NOT_FOUND); 

            return found
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
   }

  
   async getByEnterprise(enterprise_id:number):Promise<Categoria[]|HttpException>{
        try {
        let res =await this.EnterpriseService.getId(enterprise_id);
        if(res instanceof HttpException) throw res
        // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found=await this.CategoriaModule.find({enterprise_id,estado:'A'})
            if(found.length===0) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }
   async post(body:CategoriaDto):Promise<Categoria|Object>{
        try {

            const insert=this.CategoriaModule.create(body);
            if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
            return {err:false,message:"Se guardo con éxito"}
        } catch (error) {
        return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
        }
    }
    async update(id:number,body:UpdateCategoriaDto):Promise<Categoria|HttpException|Object>{
        try {
    
           const found=await this.CategoriaModule.findOne({_id:id,estado:'A'})
            if(!found) throw {err:true,message:'No se encontor esta empresa'} 
    
            const update=await this.CategoriaModule.updateOne({_id:id}, { $set: body });
            if(update.modifiedCount===0) return new HttpException('No se logro actualizar',HttpStatus.NOT_FOUND); 

            return {err:false,message:"Se actualizo con éxito"}  
        
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
    }

    async delete(id:number):Promise<Object>{
        try {
            
            const found=await this.CategoriaModule.findOne({_id:id})
            if(!found) throw {err:true,message:'No se encontor esta categoria'} 

            let est= await this.CategoriaModule.findOne({_id:id,estado:'D'});
            if(est)return new HttpException('No se encontro registro a eliminar',HttpStatus.NOT_FOUND)  
    
            const update=await this.CategoriaModule.updateOne({_id:id}, { $set: { estado: 'D' } });
            if(!update) return new HttpException('ocurrio un error al eliminar',HttpStatus.NOT_FOUND); 

            return {err:false,message:"Se elimino con éxito"}
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
    
    }

    async deleteImg(id:number):Promise<Object>{ //probar
        try {
            
            const found=await this.CategoriaModule.findOne({id,estado:'A'})
            if(!found) throw {err:true,message:'No se encontor esta subcategoria'} 
    
           if(!found.imagen) throw {err:true,message:'no hay img que eliminar'}
            found.imagen=null;
            return {err:false,message:'imagen eliminado'}
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
    
    }
}
