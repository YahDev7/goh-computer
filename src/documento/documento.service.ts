import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Documento, DocumentoDocument } from './schema/documento.schema';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { CustomerService } from 'src/customer/customer.service';
import { DocumentoByCustomerDTO, DocumentoCompraDTO, DocumentoDTO } from './dto/documento.dto';
import { UserService } from 'src/user/user.service';
import { ProviderService } from 'src/provider/provider.service';

@Injectable()
export class DocumentoService {
    constructor(
        @InjectModel(Documento.name) private DocumentoModule:Model<DocumentoDocument> ,
        private EnterpriseService:EnterpriseService,
        private UserService:UserService,
        private CustomerService:CustomerService,
        private ProviderService:ProviderService
    ){}
    //ADMIN
    async getAll():Promise<Documento[]|HttpException>{
        try {
            const res=await this.DocumentoModule.find();
            if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }

    async getVentas(){
        try {
            const res=await this.DocumentoModule.find({tipo_compra_venta:'VENTA'});
            if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }

    async getCompras(){
        try {
            const res=await this.DocumentoModule.find({tipo_compra_venta:'COMPRA'});
            if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }

    async getByVenta_id(id:string){
        try {
            const res=await this.DocumentoModule.find({_id:id,tipo_compra_venta:'VENTA'});
            if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }

    async getByCompra_id(id:string){
        try {
            const res=await this.DocumentoModule.find({_id:id,tipo_compra_venta:'COMPRA'});
            if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }



    //ENTERPRISES
    async saveVentaByUser(body:DocumentoDTO){
        try {
           let {user_id,customer_id,enterprise_id} =body

           let resEnterprise=await this.EnterpriseService.getId(enterprise_id)
           if(resEnterprise instanceof HttpException) throw resEnterprise

            let resuser=await this.UserService.getId(user_id)
            if(resuser instanceof HttpException) throw resuser

            let rescustomer=await this.CustomerService.getId(customer_id)
            if(rescustomer instanceof HttpException) throw rescustomer



            const save=await this.DocumentoModule.create(body);

             if(!save) throw {err:true,message:'No se guardardo'}
             return {err:false,message:"Se guardo con éxito"}
         } catch (error) {
             return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND); 
         }
    }

    async saveVentaByCustomer (body:DocumentoByCustomerDTO){
        try {

            let {customer_id,enterprise_id} =body
          
            let resEnterprise=await this.EnterpriseService.getId(enterprise_id)
            if(resEnterprise instanceof HttpException) throw resEnterprise

            let rescustomer=await this.CustomerService.getId(customer_id)
            if(rescustomer instanceof HttpException) throw rescustomer


             const save=await this.DocumentoModule.create({...body});

             if(!save) throw {err:true,message:'No se guardardo'}
             return {err:false,message:"Se guardo con éxito"}
         } catch (error) {
             return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND); 
         }
    }

    async saveCompra(body:DocumentoCompraDTO){
           //NINGUN CUSTOMER PUEDE HACER ESTO
           try {
            let {enterprise_id,provider_id} =body

            let resEnterprise=await this.EnterpriseService.getId(enterprise_id)
            if(resEnterprise instanceof HttpException) throw resEnterprise

            let resProvider=await this.ProviderService.getId(provider_id)
            if(resProvider instanceof HttpException) throw resProvider

            const save=await this.DocumentoModule.create(body);
            if(!save) throw {err:true,message:'No se guardardo'}
            return {err:false,message:"Se guardo con éxito"}
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND); 
        }
    }
    
    async anular(id:string){
        try {
            let res= this.DocumentoModule.find({_id:id,estado:'PENDIENTE'})
            if(res instanceof HttpException) throw res
          
             const update=await this.DocumentoModule.updateOne({_id:id}, { $set: {estado:'ANULADO'} });
             if(update.modifiedCount===0) return new HttpException('No se logro actualizar',HttpStatus.NOT_FOUND); 

             return {err:false,message:"Se anulo con éxito"}  

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND);  
        }
    }

    async getByEnterprise(enterprise_id:number){
        try {

            let resEnterprise=await this.EnterpriseService.getId(enterprise_id)
            if(resEnterprise instanceof HttpException) throw resEnterprise
    
            const res=await this.DocumentoModule.find({enterprise_id});
            if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res 
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND);  
        }
    }

    async getByDate(enterprise_id:number,fi,ff){
        try {

            let resEnterprise=await this.EnterpriseService.getId(enterprise_id)
            if(resEnterprise instanceof HttpException) throw resEnterprise
          
            const res=await this.DocumentoModule.find({ fecha: {
                $gte: fi/* new Date('2023-05-01T00:00:00Z') */,
                $lt:ff/*  new Date('2023-06-01T00:00:00Z') */
              }});

            if(res.length===0) return new HttpException('No hay Documentos que mostrar en este rango de fechas',HttpStatus.NOT_FOUND) 
            return res 
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND);  
            
        }
    }

    async getByUser(user_id:number){//ESPECIFICAR EMPRESA
        try {

            let resUser=await this.EnterpriseService.getId(user_id)
            if(resUser instanceof HttpException) throw resUser
    
            const res=await this.DocumentoModule.find({user_id});
            if(res.length===0) return new HttpException('No hay Documentos que mostrar para este user',HttpStatus.NOT_FOUND) 
            return res 
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND);  
        }
    }

    async getByCustomer(customer_id:number){//ESPECIFICAR EMPRESA
        try {

           /*  let resCustomer=await this.EnterpriseService.getId(customer_id)
            if(resCustomer instanceof HttpException) throw resCustomer */
    
            const res=await this.DocumentoModule.find({customer_id});
            if(res.length===0) return new HttpException('No hay Documentos que mostrar para este customer',HttpStatus.NOT_FOUND) 
            return res 
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND);  
        }
    }


    
}
