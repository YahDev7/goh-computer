import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compesp } from './compesp.entity';
import { CompEspDto } from './dto/compesp.dto';
import { UpdateCompEspDto } from './dto/compesp.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CompespService {

    constructor(
        @InjectRepository(Compesp)
        private CompespRepository:Repository<Compesp>,
        private ProductosService :ProductsService

        ){}
    
        async get():Promise<Compesp[]|HttpException>{
            try {
                const res= await this.CompespRepository.find();
                console.log(res)
                if(res.length===0) throw {err:true,message:'No hay datos que mostrar'} 
                 return res
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async getId(id:number):Promise<Compesp|HttpException>{
            try {
                
                const found=await this.CompespRepository.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor esta categoria'} 
                return found;
            } catch (error) {
                return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
            }
       }
       async getbyCompId(id:string):Promise<Compesp[]|HttpException>{ //falta
       
        //Empesa
        try {
            let res =await this.ProductosService.getId(id);
            if(res instanceof HttpException) throw res
            
            console.log(id)
            let res2= await this.CompespRepository.find({where:{producto_id:id}});
            if(res2.length===0)throw {err:true,message:'Este productos no tiene especificaciones'} 
            return res2
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
            
        }
            
        /*  try {
        let res =await this.ProductosService.getId({id});
        console.log(res)
        if(res instanceof HttpException) throw res
        // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found=await this.CompespRepository.find({where:{enterprise_id,estado:'A'}})
            if(found.length===0) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        } */
    }
    
       async post(body:CompEspDto):Promise<Compesp|Object>{
            try {
    
                const insert=this.CompespRepository.create(body);
                if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
                return this.CompespRepository.save(insert)
            } catch (error) {
                console.log(error)
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
            }
        }
        async update(id:number,body:UpdateCompEspDto):Promise<Compesp|HttpException>{
            try {
        
               const found=await this.CompespRepository.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor esta empresa'} 
        
                let resUpdate=Object.assign(found,body);
                return this.CompespRepository.save(resUpdate);
            
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async delete(id:number):Promise<Object>{
            try {
                
                const found=await this.CompespRepository.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor esta empresa'} 
        
                let resUpdate=Object.assign(found,{estado:'D'});
                const resfinal= await this.CompespRepository.save(resUpdate);
               
                return {err:false,message:'Enterprise eliminado'}
            } catch (error) {
                return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        
        }
}
