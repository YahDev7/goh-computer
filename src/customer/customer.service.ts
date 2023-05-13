import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './customer.entity';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private CustomerRepository:Repository<Customer>,
    private EnterpriseService:EnterpriseService

        ){}
    
        async get():Promise<Customer[]|HttpException>{
            try {
                const res= await this.CustomerRepository.find();
                console.log(res)
                if(res.length===0) throw {err:true,message:'No hay datos que mostrar'} 
                 return res
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async getId(id:number):Promise<Customer|HttpException>{
            try {
                
                const found=await this.CustomerRepository.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor este customer'} 
                return found;
            } catch (error) {
                return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
            }
       }

       async getByEnterprise(enterprise_id:number):Promise<Customer[]|HttpException>{
        try {
        let res =await this.EnterpriseService.getId(enterprise_id);
        console.log(res)
        if(res instanceof HttpException) throw res
        // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found=await this.CustomerRepository.find({where:{enterprise_id,estado:'A'}})
            if(found.length===0) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }
    
       async verifyUnique(param: {[key: string]: any}):Promise<Customer>{ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            
            const verify=await this.CustomerRepository.findOne({where:param}) 
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

       async post(body:CustomerDto):Promise<Customer|Object>{
            try {
                const res=await this.verifyAll(body);
                if(res.err) throw res;

                const insert=this.CustomerRepository.create(body);
                if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
                return this.CustomerRepository.save(insert)
            } catch (error) {
                console.log(error)
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
            }
        }
        async update(id:number,body:UpdateCustomerDto  ):Promise<Customer|HttpException>{
            try {
        
               const found=await this.CustomerRepository.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor esta empresa'} 
                const res=await this.verifyAllUpdate(body,id);
                console.log(res)
                if(res.err) throw res;
                let resUpdate=Object.assign(found,body);
                return this.CustomerRepository.save(resUpdate);
            
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async delete(id:number):Promise<Object>{
            try {
                
                const found=await this.CustomerRepository.findOne({where:{id,estado:'A'}})
                if(!found) throw {err:true,message:'No se encontor esta empresa'} 
        
                let resUpdate=Object.assign(found,{estado:'D'});
                const resfinal= await this.CustomerRepository.save(resUpdate);
               
                return {err:false,message:'Enterprise eliminado'}
            } catch (error) {
                return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        
        }
}
