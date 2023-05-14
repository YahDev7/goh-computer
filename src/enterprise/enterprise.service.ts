import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
/* 
import { Enterprises } from './enterprise.entity'; */
import { EnterpriseDto } from './dto/enterprise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Enterprise, EnterpriseDocument } from './schema/schema.enterprise';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class EnterpriseService {
    constructor(
    @InjectModel(Enterprise.name) private EnterpriseModule:Model<EnterpriseDocument> ,

       // @InjectRepository(Enterprises)
       // private EnterpriseModule :Repository<Enterprises>
    ){}

    async get():Promise<Enterprise[]|HttpException>{
        try {
            const res= await this.EnterpriseModule.find();
            if(res.length===0) throw {err:true,message:'No hay datos que mostrar'} 
             return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
        }
      
    }

    async getId(id:ObjectId):Promise<Enterprise|HttpException>{
        try {
            
            const found=await this.EnterpriseModule.findOne({_id:id,estado:'A'})
            if(!found) throw {err:true,message:'No se encontor esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al listar '+error.message||error,HttpStatus.NOT_FOUND)   
            
        }

   }
   async verifyUnique(param: {[key: string]: any}):Promise<Enterprise>{ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            
            /* const verify=await this.EnterpriseModule.findOne({where:param})  */
            const verify=await this.EnterpriseModule.findOne(param) 
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

            if (verifyNomb && verifyNomb["_id"].toString() !== id)  return { err: true, message: 'Nombre utilizado' };
             
            const verifyruc=await this.verifyUnique({ruc,id}) 
            if (verifyruc) if(verifyruc["_id"].toString() !== id)  return {err:true,message:'Ruc utilizado'}

            /* if(!verifyruc) return {err:true,message:'Ruc utilizado'} */
 
            const verifyemail=await this.verifyUnique({email,id}) 
            if (verifyemail) if(verifyemail["_id"].toString() !== id)  return {err:true,message:'Email utilizado'}

  /*            if(!verifyemail) return {err:true,message:'Email utilizado'} */

             return {err:false,message:'nice'}

        } catch (error) {
           return  error
        }
    }


    async post(body:EnterpriseDto):Promise<Enterprise|Object>{
        try {
           const res=await this.verifyAll(body);
           if(res.err) throw res;

           const insert=this.EnterpriseModule.create(body);
           if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
           
           return {err:false,message:"Se guardo con éxito"}
        } catch (error) {
            console.log(error)
          return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
        }
   }

   async update(id:number,body:EnterpriseDto){
    try {
       // console.log(id,body)

       const found:Enterprise=await this.EnterpriseModule.findOne({id,estado:'A'})
        if(!found) throw {err:true,message:'No se encontor esta empresa'} 

       const res=await this.verifyAllUpdate(body,id);
       console.log(res)
       if(res.err) throw res;

       const update=await this.EnterpriseModule.updateOne({_id:id}, { $set: body });
            if(update.modifiedCount===0) return new HttpException('No se logro actualizar',HttpStatus.NOT_FOUND); 

            return {err:false,message:"Se actualizo con éxito"}  
    
    } catch (error) {
        return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
    }
}

async delete(id:number):Promise<Object>{
    try {
        
        const found=await this.EnterpriseModule.findOne({_id:id,estado:'A'})
        if(!found) throw {err:true,message:'No se encontor esta empresa'} 

        const update=await this.EnterpriseModule.updateOne({_id:id}, { $set: { estado: 'D' } });
            if(!update) return new HttpException('ocurrio un error al eliminar',HttpStatus.NOT_FOUND); 

        return {err:false,message:'Enterprise eliminado'}
    } catch (error) {
        return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
    }

}

}
