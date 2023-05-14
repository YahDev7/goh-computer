import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/schema.user';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {

    constructor(
        //@InjectRepository(User)
        @InjectModel(User.name) private UserModule:Model<UserDocument> ,

       // private UserModule:Repository<User>,
        private EnterpriseService:EnterpriseService

        
        ){}
    
        async get():Promise<User[]|HttpException>{
            try {
                const res= await this.UserModule.find();
                console.log(res)
                if(res.length===0) throw {err:true,message:'No hay datos que mostrar'} 
                 return res
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async getId(id:ObjectId):Promise<User|HttpException>{
            try {
                const found=await this.UserModule.findOne({id,estado:'A'})
                console.log(found)

                if(!found) throw {err:true,message:'error al buscar este user'} 
                return found;
            } catch (error) {
                return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
            }
       }

       async getByEnterprise(enterprise_id:ObjectId):Promise<User[]|HttpException>{
        try {
          let res =await this.EnterpriseService.getId(enterprise_id);
          console.log(res)
          if(res instanceof HttpException) throw res
           // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
    
            const found=await this.UserModule.find({enterprise_id,estado:'A'})
            if(found.length===0) throw {err:true,message:'No se encontro esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }
    
       async verifyUnique(param: {[key: string]: any}):Promise<User>{ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            
            const verify=await this.UserModule.findOne(param) 
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

    async verifyAllUpdate(body:UpdateUserDto,id:ObjectId){ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const{dni,email,telefono}=body;

            const verifyNomb =await this.verifyUnique({dni})
            if (verifyNomb) if(verifyNomb["_id"] !== id)  return { err: true, message: 'dni utilizado' };
             
            const verifyremail=await this.verifyUnique({email,id}) 
            if(!verifyremail) if(verifyremail["_id"]!==id) return {err:true,message:'email utilizado'}
 
            const verifytelefono=await this.verifyUnique({telefono,id}) 
             if(!verifytelefono) if(verifytelefono["_id"]!==id)  return {err:true,message:'telefono utilizado'}

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


                const insert=this.UserModule.create(body);
                if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
                return {err:false,message:"Se guardo con éxito"}

              /*   const insert=this.UserModule.create(body);
                if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
                return this.UserModule.save(insert) */
            } catch (error) {
                console.log(error)
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
            }
        }
        async update(id:ObjectId,body:UpdateUserDto ):Promise<Object|HttpException>{
            try {
        
               const found=await this.UserModule.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor este user'} 
                const res=await this.verifyAllUpdate(body,id);
                console.log(res)
                if(res.err) throw res;

                const update=await this.UserModule.updateOne({_id:id}, { $set: body });
                if(update.modifiedCount===0) return new HttpException('No se logro actualizar',HttpStatus.NOT_FOUND); 
               
                return {err:false,message:"Se actualizo con éxito"}  
    
               /*  let resUpdate=Object.assign(found,body);
                return this.UserModule.save(resUpdate); */
            
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async delete(id:ObjectId):Promise<Object>{
            try {
                
                const found=await this.UserModule.findOne({id,estado:'A'})
                if(!found) throw {err:true,message:'No se encontor esta empresa'} 
        
                const update=await this.UserModule.updateOne({_id:id}, { $set: { estado: 'D' } });
                if(!update) return new HttpException('ocurrio un error al eliminar',HttpStatus.NOT_FOUND); 

               /*  let resUpdate=Object.assign(found,{estado:'D'});
                const resfinal= await this.UserModule.save(resUpdate); */
               
                return {err:false,message:'Enterprise eliminado'}
            } catch (error) {
                return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        
        }
}
