import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { Repository } from 'typeorm';
import { CategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

@Injectable()
export class CategoriaService {
constructor(
    @InjectRepository(Categoria)
    private CategoriaRepository:Repository<Categoria>,
    private EnterpriseService:EnterpriseService

    ){}

    async get():Promise<Categoria[]|HttpException>{
        try {
            const res= await this.CategoriaRepository.find();
            console.log(res)
            if(res.length===0) throw {err:true,message:'No hay datos que mostrar'} 
             return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
    }

    async getId(id:number):Promise<Categoria|HttpException>{
        try {
            
            const found=await this.CategoriaRepository.findOne({where:{id,estado:'A'}})
            if(!found) throw {err:true,message:'No se encontor esta categoria'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
   }

  
   async getByEnterprise(enterprise_id:number):Promise<Categoria[]|HttpException>{
        try {
        let res =await this.EnterpriseService.getId(enterprise_id);
        console.log(res)
        if(res instanceof HttpException) throw res
        // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found=await this.CategoriaRepository.find({where:{enterprise_id,estado:'A'}})
            if(found.length===0) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }
   async post(body:CategoriaDto):Promise<Categoria|Object>{
        try {

            const insert=this.CategoriaRepository.create(body);
            if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
            return this.CategoriaRepository.save(insert)
        } catch (error) {
            console.log(error)
        return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
        }
    }
    async update(id:number,body:UpdateCategoriaDto):Promise<Categoria|HttpException>{
        try {
    
           const found=await this.CategoriaRepository.findOne({where:{id,estado:'A'}})
            if(!found) throw {err:true,message:'No se encontor esta empresa'} 
    
            let resUpdate=Object.assign(found,body);
            return this.CategoriaRepository.save(resUpdate);
        
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
    }

    async delete(id:number):Promise<Object>{
        try {
            
            const found=await this.CategoriaRepository.findOne({where:{id,estado:'A'}})
            if(!found) throw {err:true,message:'No se encontor esta empresa'} 
    
            let resUpdate=Object.assign(found,{estado:'D'});
            const resfinal= await this.CategoriaRepository.save(resUpdate);
           
            return {err:false,message:'Enterprise eliminado'}
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
    
    }

    async deleteImg(id:number):Promise<Object>{ //probar
        try {
            
            const found=await this.CategoriaRepository.findOne({where:{id,estado:'A'}})
            if(!found) throw {err:true,message:'No se encontor esta subcategoria'} 
    
           if(!found.imagen) throw {err:true,message:'no hay img que eliminar'}
            found.imagen=null;
            return {err:false,message:'imagen eliminado'}
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
    
    }
}
