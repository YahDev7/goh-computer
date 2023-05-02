import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Enterprises } from './enterprise.entity';
import { EnterpriseDto } from './dto/enterprise.dto';

@Injectable()
export class EnterpriseService {
    constructor(
        @InjectRepository(Enterprises)
        private EnterpriseRepository :Repository<Enterprises>
    ){}

    async get():Promise<Enterprises[]|HttpException>{
        try {
            const res= await this.EnterpriseRepository.find();
            if(res.length===0) throw {err:true,message:'No hay datos que mostrar'} 
             return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
      
    }

    async getId(id:number):Promise<Enterprises|HttpException>{
        try {
            
            const found=await this.EnterpriseRepository.findOne({where:{id,estado:'A'}})
            if(!found) throw {err:true,message:'No se encontor esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al listar '+error.message||error,HttpStatus.NOT_FOUND)   
            
        }

   }
   async verifyUnique(param: {[key: string]: any}):Promise<Enterprises>{ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            
            const verify=await this.EnterpriseRepository.findOne({where:param}) 
            return verify;
        } catch (error) {
            
        }
    }
    async verifyAll(body:EnterpriseDto){ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const{nombre,ruc,email}=body;
            const verifyNomb =await this.verifyUnique({nombre})
            if(verifyNomb ) return {err:true,message:'Nombre utilizado'}
 
            const verifyruc=await this.verifyUnique({ruc}) 
            if(verifyruc) return {err:true,message:'Ruc utilizado'}
 
            const verifyemail=await this.verifyUnique({email}) 
             if(verifyemail) return {err:true,message:'Email utilizado'}

             return {err:false,message:'nice'}

        } catch (error) {
           return  error
        }
    }

    async verifyAllUpdate(body:EnterpriseDto,id:number){ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const{nombre,ruc,email}=body;
            const verifyNomb =await this.verifyUnique({nombre})
            if (verifyNomb && verifyNomb.id !== id)  return { err: true, message: 'Nombre utilizado' };
             
            const verifyruc=await this.verifyUnique({ruc,id}) 
            if(!verifyruc) return {err:true,message:'Ruc utilizado'}
 
            const verifyemail=await this.verifyUnique({email,id}) 
             if(!verifyemail) return {err:true,message:'Email utilizado'}

             return {err:false,message:'nice'}

        } catch (error) {
           return  error
        }
    }


    async post(body:EnterpriseDto):Promise<Enterprises|Object>{
        try {
           const res=await this.verifyAll(body);
           if(res.err) throw res;
            const insert=this.EnterpriseRepository.create(body);
            return this.EnterpriseRepository.save(insert)
        } catch (error) {
            console.log(error)
          return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
        }
   }

   async update(id:number,body:EnterpriseDto){
    try {
       // console.log(id,body)

       const found:Enterprises=await this.EnterpriseRepository.findOne({where:{id,estado:'A'}})
        if(!found) throw {err:true,message:'No se encontor esta empresa'} 

       const res=await this.verifyAllUpdate(body,id);
       console.log(res)
       if(res.err) throw res;
        let resUpdate=Object.assign(found,body);
        return this.EnterpriseRepository.save(resUpdate);
    
    } catch (error) {
        return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
    }
}

async delete(id:number):Promise<Object>{
    try {
        
        const found=await this.EnterpriseRepository.findOne({where:{id,estado:'A'}})
        if(!found) throw {err:true,message:'No se encontor esta empresa'} 

        let resUpdate=Object.assign(found,{estado:'D'});
        const resfinal= await this.EnterpriseRepository.save(resUpdate);
        console.log(resfinal);
        return {err:false,message:'Enterprise eliminado'}
    } catch (error) {
        return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
    }

}

}
