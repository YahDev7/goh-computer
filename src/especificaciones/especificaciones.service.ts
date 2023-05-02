import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especificaciones } from './especificaciones.entity';
import { EspecificacionesDto, UpdateEspecificacionesDto } from './dto/especificaciones.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

@Injectable()
export class EspecificacionesService {

    constructor(
        @InjectRepository(Especificaciones)
        private EnterpriseRepository :Repository<Especificaciones>,
    private EnterpriseService:EnterpriseService

    ){}

    async get():Promise<Especificaciones[]|HttpException>{
        try {
            const res= await this.EnterpriseRepository.find();
            if(res.length===0) throw {err:true,message:'No hay datos que mostrar'} 
             return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
      
    }

    async getId(id:number):Promise<Especificaciones|HttpException>{
        try {
            
            const found=await this.EnterpriseRepository.findOne({where:{id,estado:'A'}})
            if(!found) throw {err:true,message:'No se encontor esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            
        }

   }
   async getByEnterprise(enterprise_id:number):Promise<Especificaciones[]|HttpException>{
    try {
    let res =await this.EnterpriseService.getId(enterprise_id);
    console.log(res)
    if(res instanceof HttpException) throw res
    // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

        const found=await this.EnterpriseRepository.find({where:{enterprise_id,estado:'A'}})
        if(found.length===0) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
        return found;
    } catch (error) {
        return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
    }
}
    async post(body:EspecificacionesDto):Promise<Especificaciones|Object>{
        try {
        
            const insert=this.EnterpriseRepository.create(body);
            return this.EnterpriseRepository.save(insert)
        } catch (error) {
            console.log(error)
          return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
        }
   }

   async update(id:number,body:UpdateEspecificacionesDto){
    try {
       // console.log(id,body)

       const found:Especificaciones=await this.EnterpriseRepository.findOne({where:{id,estado:'A'}})
        if(!found) throw {err:true,message:'No se encontor esta empresa'} 

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
