import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { SubCategoriaDto, UpdateSubCategoriaDto } from './dto/subcategoria.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { SubCategoria, SubCategoriaDocument } from './schema/subcategoria.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SubcategoriaService {

    constructor(
        @InjectModel(SubCategoria.name) private SubCategoriaModule:Model<SubCategoriaDocument> ,
        private EnterpriseService:EnterpriseService,
        private jwtService: JwtService,

        ){}
    
        async get():Promise<SubCategoria[]|HttpException>{
            try {
                const res= await this.SubCategoriaModule.find();
                if(res.length===0) return new HttpException('No hay datos que mostrar',HttpStatus.NOT_FOUND) 

                 return res
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async getId(id:string):Promise<SubCategoria|HttpException>{
            try {
                
                let est= await this.SubCategoriaModule.findOne({_id:id,estado:'D'});
            if(est)return new HttpException('No se encontro registro',HttpStatus.NOT_FOUND)   

            let found=await this.SubCategoriaModule.findOne({_id:id});
            if(!found) return new HttpException('No se encontro registro',HttpStatus.NOT_FOUND); 

            return found
            } catch (error) {
                return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
            }
       }

       
      async getByEnterprise(token:string):Promise<SubCategoria[]|HttpException>{
        try {
            const decodedToken = this.jwtService.verify(token);
           let {enterprise_id} =decodedToken
           enterprise_id=new ObjectId(enterprise_id);
          let res =await this.EnterpriseService.getId(enterprise_id);
          if(res instanceof HttpException) throw res
           // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found=await this.SubCategoriaModule.find({enterprise_id,estado:'A'})
            console.log(found)
            if(found.length===0) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
   }
    
    
       async post(body:SubCategoriaDto):Promise<SubCategoria|Object>{
            try {
    
                let {categoria_id,usuario_id,enterprise_id} =body
                categoria_id=new ObjectId(categoria_id)
                
                usuario_id=new ObjectId(usuario_id)
                enterprise_id=new ObjectId(enterprise_id)

                const insert=this.SubCategoriaModule.create({...body,categoria_id,usuario_id,enterprise_id}); 
                if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
                return insert
               /*  return {err:false,message:"Se guardo con éxito"} */
            } catch (error) {
            return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)
            }
        }
        async update(id:number,body:UpdateSubCategoriaDto):Promise<SubCategoria|HttpException|Object>{
            try {
        
                const found=await this.SubCategoriaModule.findOne({_id:id,estado:'A'})
                if(!found) throw {err:true,message:'No se encontor esta empresa'} 
        
                const update=await this.SubCategoriaModule.updateOne({_id:id}, { $set: body });
                if(update.modifiedCount===0) return new HttpException('No se logro actualizar',HttpStatus.NOT_FOUND); 
    
                return {err:false,message:"Se actualizo con éxito"}  
            
            } catch (error) {
                return new HttpException('Ocurrio un error al guardar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        }
    
        async delete(id:number):Promise<Object>{
            try {
                
                const found=await this.SubCategoriaModule.findOne({_id:id})
                if(!found) throw {err:true,message:'No se encontor esta categoria'} 
    
                let est= await this.SubCategoriaModule.findOne({_id:id,estado:'D'});
                if(est)return new HttpException('No se encontro registro a eliminar',HttpStatus.NOT_FOUND)  
        
                const update=await this.SubCategoriaModule.updateOne({_id:id}, { $set: { estado: 'D' } });
                if(!update) return new HttpException('ocurrio un error al eliminar',HttpStatus.NOT_FOUND); 
    
                return {err:false,message:"Se elimino con éxito"}
            } catch (error) {
                return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        
        }


        async deleteImg(id:number):Promise<Object>{ //probar
            try {
                
                const found=await this.SubCategoriaModule.findOne({_id:id,estado:'A'})
                if(!found) throw {err:true,message:'No se encontor esta subcategoria'} 
        
               if(!found.imagen) throw {err:true,message:'no hay img que eliminar'}
                found.imagen=null;
                return {err:false,message:'imagen eliminado'}
            } catch (error) {
                return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        
        }


        async getBycat(id:string):Promise<Object>{ //probar
            try {
             /*    let est= await this.SubCategoriaModule.findOne({_id:id,estado:'D'});
                if(est)return new HttpException('No se encontro registro',HttpStatus.NOT_FOUND)  */  
    
                const found=await this.SubCategoriaModule.find({categoria_id:new ObjectId(id),estado:'A'})
                if(found.length===0) throw {err:true,message:'No se encontor ninguna subcategoria por esta categoria'} 

                return found;
        
            } catch (error) {
                return new HttpException('Ocurrio un error al eliminar '+error.message||error,HttpStatus.NOT_FOUND)   
            }
        
        }

        
    async postByEnterprise(body: SubCategoriaDto,token): Promise<SubCategoria | Object> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let {enterprise_id,usuario_id} =decodedToken;
            let {categoria_id}=body
            enterprise_id = new ObjectId(enterprise_id)
            usuario_id = new ObjectId(usuario_id)
            categoria_id=new ObjectId(categoria_id)

           body={...body,enterprise_id,usuario_id,categoria_id } 
            
            const insert =await this.SubCategoriaModule.create(body);
            console.log(insert)
            if (!insert) return new HttpException('Ocurrio un error al guardar ', HttpStatus.NOT_FOUND)
            return insert
            /*  return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }




        /* GOH */
       /*  async getIdByCat(){
            let res =await this.
        } */
}
