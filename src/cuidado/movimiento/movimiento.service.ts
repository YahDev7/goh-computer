/* import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from './movimiento.entity';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { CustomerService } from 'src/customer/customer.service';
import { MovimientoDto } from './dto/movimiento.dto';
import { DocumentoService } from 'src/documento/documento.service';

@Injectable()
export class MovimientoService { */
/*     constructor(

        @InjectRepository(Movimiento)
        private MovimientoRepository :Repository<Movimiento>,
        private EnterpriseService:EnterpriseService,
        private CustomerService:CustomerService,
        private DocumentoService:DocumentoService,
    ){}

    async get():Promise<Movimiento[]|HttpException>{
        try {
            const res=await this.MovimientoRepository.find();
            if(res.length===0) return new HttpException('No hay depostios que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }


    async getId(id:number):Promise<Movimiento|HttpException>{
        try {

            let found=await this.MovimientoRepository.findOne({where:{id}});
            if(!found) return new HttpException('No se encontro deposito',HttpStatus.NOT_FOUND); 

            return found
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar'+error,HttpStatus.NOT_FOUND) 
        }
    }
    async getByEnterprise(enterprise_id:number):Promise<Movimiento[]|HttpException>{
        try {
            let res =await this.EnterpriseService.getId(enterprise_id);
            if(res instanceof HttpException) throw res

            const found=await this.MovimientoRepository.find({where:{enterprise_id,estado:'A'}})
            if(found.length===0) throw {err:true,message:'No se encontraron depositos'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }

    async save(body:MovimientoDto):Promise<Movimiento|Object>{
        try {
          
            const{enterprise_id}=body
            let resEnterprise =await this.EnterpriseService.getId(enterprise_id);
            if(resEnterprise instanceof HttpException) throw resEnterprise

            const insert=this.MovimientoRepository.create(body);
            if(!insert) throw {err:true,message:'Ocurrio un error al guardar'}

             this.MovimientoRepository.save(insert)

            return {err:false,message:"Se guardo con éxito"}
            
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND); 
        }
    }

    async getByCustomer(customer_id:number):Promise<Movimiento[]|HttpException>{
        try {
          
            let rescustomer=await this.CustomerService.getId(customer_id)
            if(rescustomer instanceof HttpException) throw rescustomer;

            let resdoc= await this.DocumentoService.getByCustomer(customer_id)
            if(resdoc instanceof HttpException) throw resdoc
            

            //let res =await this.MovimientoRepository.find({where:{}})



        } catch (error) {
            return new HttpException('Ocurrio un error '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    } 
}
*/