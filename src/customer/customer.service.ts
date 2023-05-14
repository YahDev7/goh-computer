import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomeraDocument } from './schema/schema.customer';
import { ObjectId } from 'mongodb';

@Injectable()
export class CustomerService {
    constructor(
            @InjectModel(Customer.name) private CustomerModule:Model<CustomeraDocument> ,

       /*  @InjectRepository(Customer)
        private CustomerModule:Repository<Customer>, */
            private EnterpriseService:EnterpriseService

        ){}
    
        async get():Promise<Customer[]|HttpException>{
            try {
                const res= await this.CustomerModule.find();
                console.log(res)
                if(res.length===0) throw {err:true,message:'No hay datos que mostrar'} 
                 return res
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async getId(id:ObjectId):Promise<Customer|HttpException>{
            try {
                
                const found=await this.CustomerModule.findOne({id,estado:'A'})
                if(!found) throw {err:true,message:'No se encontor este customer'} 
                return found;
            } catch (error) {
                return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
            }
       }

       async getByEnterprise(enterprise_id:ObjectId):Promise<Customer[]|HttpException>{
        try {
        let res =await this.EnterpriseService.getId(enterprise_id);
        console.log(res)
        if(res instanceof HttpException) throw res
        // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found=await this.CustomerModule.find({enterprise_id,estado:'A'})
            if(found.length===0) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }
    
       async verifyUnique(param: {[key: string]: any}):Promise<Customer>{ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            
            const verify=await this.CustomerModule.findOne(param) 
            return verify;
        } catch (error) {
            
        }
    }
    async verifyAll(body:CustomerDto){ //param es un obj con keys "string" y sus valores de cualquier tipo
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

    async verifyAllUpdate(body:UpdateCustomerDto,id:number){ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const{dni,email,telefono}=body;

            const verifyNomb =await this.verifyUnique({dni})
            if (verifyNomb) if(verifyNomb['_id'] !== id)  return { err: true, message: 'dni utilizado' };
             
            const verifyremail=await this.verifyUnique({email,id}) 
            if(!verifyremail) if(verifyremail['_id']!==id) return {err:true,message:'email utilizado'}
 
            const verifytelefono=await this.verifyUnique({telefono,id}) 
             if(!verifytelefono) if(verifytelefono['_id']!==id)  return {err:true,message:'telefono utilizado'}

             return {err:false,message:'nice'}

        } catch (error) {
           return  error
        }
    }

       async post(body:CustomerDto):Promise<Customer|Object>{
            try {
                const res=await this.verifyAll(body);
                if(res.err) throw res;

                let {enterprise_id,user_id} =body
                enterprise_id=new ObjectId(enterprise_id)
                user_id=new ObjectId(user_id)


            const save=await this.CustomerModule.create({...body,enterprise_id,user_id});
            if(!save) throw {err:true,message:'No se guardardo'}
            return {err:false,message:"Se guardo con éxito"}
            } catch (error) {
                console.log(error)
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
            }
        }
        async update(id:number,body:UpdateCustomerDto  ):Promise<Customer|HttpException|Object>{
            try {
        
               const found=await this.CustomerModule.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor esta empresa'} 
                const res=await this.verifyAllUpdate(body,id);
                console.log(res)
                if(res.err) throw res;
               
                const update=await this.CustomerModule.updateOne({_id:id}, { $set: body });
                if(update.modifiedCount===0) return new HttpException('No se logro actualizar',HttpStatus.NOT_FOUND); 
   
                return {err:false,message:"Se actualizo con éxito"}  
            
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async delete(id:number):Promise<Object>{
            try {
                
                const found=await this.CustomerModule.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor esta empresa'} 
        
                const update=await this.CustomerModule.updateOne({_id:id}, { $set: { estado: 'D' } });
                if(!update) return new HttpException('ocurrio un error al eliminar',HttpStatus.NOT_FOUND); 
               
                return {err:false,message:'Enterprise eliminado'}
            } catch (error) {
                return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        
        }
}
