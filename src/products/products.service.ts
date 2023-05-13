import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

import { Products, ProductsDocument } from './schema/products.schema';
import { ProductDto, UpdateProductDto } from './dto/products.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { SubcategoriaService } from 'src/subcategoria/subcategoria.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products.name) private productssModule:Model<ProductsDocument> ,
        private EnterpriseService:EnterpriseService,
        private SubCategoriaService:SubcategoriaService,

    ){}
  
    async get():Promise<Products[]|HttpException>{
        try {
            const res=await this.productssModule.find();
            if(res.length===0) return new HttpException('No hay productos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }

    async getId(id:string):Promise<Products|HttpException>{
        try {

            let est= await this.productssModule.findOne({_id:id,estado:'D'});
            if(est)return new HttpException('No se encontro registro',HttpStatus.NOT_FOUND)   

            let found=await this.productssModule.findOne({_id:id});
            if(!found) return new HttpException('No se encontro registro',HttpStatus.NOT_FOUND); 

            return found
        } catch (error) {   
            return new HttpException('Ocurrio un error al listar'+error,HttpStatus.NOT_FOUND) 
        }
    }
    async getByEnterprise(enterprise_id:number):Promise<Products[]|HttpException>{
        try {
        let res =await this.EnterpriseService.getId(enterprise_id);
        if(res instanceof HttpException) throw res
        // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found=await this.productssModule.find({enterprise_id,estado:'A'})
            if(found.length===0) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
        }
    }
    async save(body:ProductDto):Promise<Products|Object>{
        try {
           let {subcategoria_id} =body
            subcategoria_id=new ObjectId(subcategoria_id)

            const save=await this.productssModule.create({...body,subcategoria_id});
            if(!save) throw {err:true,message:'No se guardardo'}
            return {err:false,message:"Se guardo con éxito"}
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar'+error.message||error,HttpStatus.NOT_FOUND); 
        }
    }

    async verifyUnique(param:Object):Promise<Products>{ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const verify=await this.productssModule.findOne(param) 

            return verify;
        } catch (error) {
            
        }
    }

    async verifyAllUpdate(body:UpdateProductDto,id:number){ //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const{codfabricante,codigo}=body;
            const verifyCodFab =await this.verifyUnique({codfabricante})
           //console.log(verifyCodFab["_id"].toString()!==id )
            if (verifyCodFab) if(verifyCodFab["_id"].toString() !== id)  return { err: true, message: 'Codigo fab utilizado' };
           
            const verifycodigo= await this.verifyUnique({codigo}) 
            if (verifycodigo) if(verifycodigo["_id"].toString() !== id)  return {err:true,message:'Codigo utilizado'}
 
             return {err:false,message:'nice'} 

        } catch (error) {
           return  error
        }
    }
    async update(id:number,body:UpdateProductDto):Promise<Products|Object>{
        try {
            
            let found=await this.productssModule.findOne({_id:id,estado:"A"});
            if(!found) return new HttpException('No existe este product',HttpStatus.NOT_FOUND); 

            let res=await this.verifyAllUpdate(body,id)
            if(res.err) throw res;

          
             const update=await this.productssModule.updateOne({_id:id}, { $set: body });
             if(update.modifiedCount===0) return new HttpException('No se logro actualizar',HttpStatus.NOT_FOUND); 

             return {err:false,message:"Se actualizo con éxito"}  
        } catch (error) {
            return new HttpException('Ocurrio un error al update, '+error.message||error,HttpStatus.NOT_FOUND); 
        }
    }
    async delete(id:string){
        try {
            let found=await this.productssModule.find({_id:id});
            if(!found) return new HttpException('No se encontro registro a eliminar',HttpStatus.NOT_FOUND); 

            let est= await this.productssModule.find({_id:id,estado:'D'});
            if(est.length>=1)return new HttpException('No se encontro registro a eliminar',HttpStatus.NOT_FOUND)     
           
        
            const update=await this.productssModule.updateOne({_id:id}, { $set: { estado: 'D' } });
            if(!update) return new HttpException('ocurrio un error al eliminar',HttpStatus.NOT_FOUND); 

            return {err:false,message:"Se elimino con éxito"}
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar, VERIFIQUE',HttpStatus.NOT_FOUND); 
        }
      
    }

/* GOHCOMPUTER */
    async getMain(){
        try {
           let res= await this.productssModule.aggregate([
               {
                  $match: {
                    stock: { $gt: 0 },
                    estado: 'A'
                  }
                },
                {
                  $lookup: {
                    from: 'subcategorias',
                    localField: 'subcategoria_id',
                    foreignField: '_id',
                    as: 'subcat'
                  }
                },
                {
                  $addFields: {
                    precio_promoventa: { $ifNull: ['$precio_promoventa', 0] },
                  }
                },
                {
                  $project: {
                   _id:0,
                    idcomp: '$_id',
                    subcategoria_id:{$arrayElemAt: ['$subcat._id', 0]},
                    nomcomp: '$nombre',
                    descomp: '$descripcion',
                    precio_venta: 1,
                    stock: 1,
                    subcatnombre:{$arrayElemAt: ['$subcat.nombre', 0]} ,
                    subcatimg:{$arrayElemAt: ['$subcat.imagen', 0]} ,
                    nomcat: {$arrayElemAt: ['$subcat.nombre', 0]} ,
                    idcat: {$arrayElemAt: ['$subcat.categoria_id', 0]} ,
                    imagenes:'$imagenes',
                    precio_promoventa:1
                  }
                } 
              ])

        if(res.length===0) throw {err:true,message:"No hay productos a mostrar"}
        return res
         /*    let res3 =await this.productssModule.find({estado:'A'}).limit(5)
            for (let i = 0; i < res3.length; i++) {
               
                let res1=await this.SubCategoriaService.getId(res3[i].subcategoria_id)
                if(res1 instanceof HttpException) throw res1
                let r = { ...res3[i].toJSON(),Subcategoria:{...res1} }

                console.log(r)
            } */
        } catch (error) {
            return new HttpException('Ocurrio un error '+error.message||error,HttpStatus.NOT_FOUND)     
            
        }
    }
    async getDestacados(){
        let res= await this.productssModule.aggregate([
            {
              $match: {
                stock: { $gt: 0 },
                estado: 'A',
                ventas: { $gt: 0 }
              }
            },
            {
              $lookup: {
                from: 'subcategorias',
                localField: 'subcategoria_id',
                foreignField: '_id',
                as: 'subcat'
              }
            },
            {
              $project: {
                _id:0,
                idcomp: '$_id',
                subcategoria_id:{$arrayElemAt: ['$subcat._id', 0]},
                nomcomp: '$nombre',
                descomp: '$descripcion',
                precio_venta: 1,
                stock: 1,
                subcatnombre:{$arrayElemAt: ['$subcat.nombre', 0]} ,
                subcatimg:{$arrayElemAt: ['$subcat.imagen', 0]} ,
                nomcat: {$arrayElemAt: ['$subcat.nombre', 0]} ,
                idcat: {$arrayElemAt: ['$subcat.categoria_id', 0]} 
              }
            },
          ]);
        if(res.length===0) throw {err:true,message:"No hay productos a mostrar"}
        return res
    }

    async getNews(){
        let res= await this.productssModule.aggregate([

            {
              $match: {
                stock: { $gt: 0 },
                estado: 'A',
                 ventas: { $gt: 0 } 
              }
            },
            {
              $lookup: {
                from: 'subcategorias',
                localField: 'subcategoria_id',
                foreignField: '_id',
                as: 'subcat'
              }
            },
            {
              $project: {
                _id:0,
                idcomp: '$_id',
                subcategoria_id:{$arrayElemAt: ['$subcat._id', 0]},
                nomcomp: '$nombre',
                descomp: '$descripcion',
                precio_venta: 1,
                stock: 1,
                subcatnombre:{$arrayElemAt: ['$subcat.nombre', 0]} ,
                subcatimg:{$arrayElemAt: ['$subcat.imagen', 0]} ,
                nomcat: {$arrayElemAt: ['$subcat.nombre', 0]} ,
                idcat: {$arrayElemAt: ['$subcat.categoria_id', 0]} 

              }
            },
            {
              $sort: { idcomp: -1 }
            },
            {
              $limit: 10
            }
          ])
              return res
    }
    async getByIdProd(id:string){
           try {
            let res= await this.productssModule.aggregate([
                { $match: { _id:new ObjectId(id) , stock: { $gt: 0 }, estado: 'A' } },
                {
                  $lookup: {
                    from: 'subcategorias',
                    localField: 'subcategoria_id',
                    foreignField: '_id',
                    as: 'subcat',
                  },
                },
                {
                  $addFields: {
                    precio_promoventa: { $ifNull: ['$precio_promoventa', 0] },
                  }
                },
                {
                    $project: {
                        _id:0,
                         idcomp: '$_id',
                         subcategoria_id:{$arrayElemAt: ['$subcat._id', 0]},
                        garantia: 1,
                        url_fab: 1,
                        nomcomp: '$nombre',
/*                         fechafinpromo: { $dateToString: { format: '%d-%m-%Y', date: '$fechafinpromo' } },
 */                        descomp: '$descripcion',
                         precio_venta: 1,
                         stock: 1,
                         subcatnombre:{$arrayElemAt: ['$subcat.nombre', 0]} ,
                         subcatimg:{$arrayElemAt: ['$subcat.imagen', 0]} ,
                         nomcat: {$arrayElemAt: ['$subcat.nombre', 0]} ,
                        imagenes:'$imagenes',
                        idcat: {$arrayElemAt: ['$subcat.categoria_id', 0]} ,
                        precio_promoventa:1,
                        especificaciones:1

                       }
                }
              ]);
              if(res.length===0) throw {err:true,message:"No hay productos a mostrar"};
                console.log(res)

                  return res[0]
           } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id '+error.message||error,HttpStatus.NOT_FOUND)     
           }
    }

    async getBySubcat(id:string){
      try {
        let res= await this.productssModule.aggregate([
          {
              $match: {
                subcategoria_id: new ObjectId(id),
                stock: { $gt: 0 },
                estado: "A"
              }
            },
          {
            $lookup: {
              from: "subcategorias",
              localField: "subcategoria_id",
              foreignField: "_id",
              as: "subcat"
            }
          },

          {
            $project: {
              _id:0,
              idcomp: '$_id',
              subcategoria_id:{$arrayElemAt: ['$subcat._id', 0]},
              garantia: 1,
              url_fab: 1,
              nomcomp: '$nombre',
              /* fechafinpromo: { $dateToString: { format: '%d-%m-%Y', date: '$fechafinpromo' } }, */
              descomp: '$descripcion',
                precio_venta: 1,
              stock: 1,
              subcatnombre:{$arrayElemAt: ['$subcat.nombre', 0]} ,
              subcatimg:{$arrayElemAt: ['$subcat.imagen', 0]} ,
              nomcat: {$arrayElemAt: ['$subcat.nombre', 0]} ,
              imagenes:'$imagenes',
              idcat: {$arrayElemAt: ['$subcat.categoria_id', 0]} 
            }
          }
        ])
        if(res.length===0) throw {err:true,message:"No hay productos a mostrar"}

            return res
      } catch (error) {
        return new HttpException('Ocurrio un error al buscar por subcategoria '+error.message||error,HttpStatus.NOT_FOUND)     
        
      }
          
    }
  async getPromo(){
      try {
         let res= await this.productssModule.aggregate([
             {
                $match: {
                  stock: { $gt: 0 },
                  estado: 'A',
                  promocion:'SI'
                }
              },
              {
                $lookup: {
                  from: 'subcategorias',
                  localField: 'subcategoria_id',
                  foreignField: '_id',
                  as: 'subcat'
                }
              },
              {
                $addFields: {
                  precio_promoventa: { $ifNull: ['$precio_promoventa', 0] },
                }
              },
              {
                $project: {
                 _id:0,
                  idcomp: '$_id',
                  subcategoria_id:{$arrayElemAt: ['$subcat._id', 0]},
                  nomcomp: '$nombre',
                  descomp: '$descripcion',
                  precio_venta: 1,
                  stock: 1,
                  subcatnombre:{$arrayElemAt: ['$subcat.nombre', 0]} ,
                  subcatimg:{$arrayElemAt: ['$subcat.imagen', 0]} ,
                  nomcat: {$arrayElemAt: ['$subcat.nombre', 0]} ,
                  idcat: {$arrayElemAt: ['$subcat.categoria_id', 0]} ,
                  imagenes:'$imagenes',
                  precio_promoventa:1,

                }
              } 
            ])
    
      if(res.length===0) throw {err:true,message:"No hay productos a mostrar"}
      return res
    
      } catch (error) {
          return new HttpException('Ocurrio un error '+error.message||error,HttpStatus.NOT_FOUND)     
          
      }
    }



    async search(search:string){
      try {
         let res= await this.productssModule.aggregate([
          {
            $match: {
              nombre: { $regex: search, $options: 'i' },
              stock: { $gt: 0 },
              estado: 'A',
            },
          },
          {
            $lookup: {
              from: 'subcategorias',
              localField: 'subcategoria_id',
              foreignField: '_id',
              as: 'subcat'
            }
          },
          {
            $addFields: {
              precio_promoventa: { $ifNull: ['$precio_promoventa', 0] },
            }
          },
          {
            $project: {
             _id:0,
              idcomp: '$_id',
              subcategoria_id:{$arrayElemAt: ['$subcat._id', 0]},
              nomcomp: '$nombre',
              descomp: '$descripcion',
              precio_venta: 1,
              stock: 1,
              subcatnombre:{$arrayElemAt: ['$subcat.nombre', 0]} ,
              subcatimg:{$arrayElemAt: ['$subcat.imagen', 0]} ,
              nomcat: {$arrayElemAt: ['$subcat.nombre', 0]} ,
              idcat: {$arrayElemAt: ['$subcat.categoria_id', 0]} ,
              imagenes:'$imagenes',
              precio_promoventa:1,
            }
          } 
        ])
    
      if(res.length===0) throw {err:true,message:"No hay productos a mostrar"}
      console.log(res)
      return res
    
      } catch (error) {
          return new HttpException('Ocurrio un error '+error.message||error,HttpStatus.NOT_FOUND)     
          
      }
    }

    

  }





/* 
QUERY DE MONGO CON POSTGRE
import { getMongoRepository, MongoRepository } from 'typeorm';
import { Componente } from './componente.entity';

const componenteRepository = getMongoRepository(Componente);

const query = componenteRepository.createQueryBuilder('componente')
  .select('componente.id', 'idcomp')
  .addSelect('componente.subcategoria_id')
  .addSelect('componente.nombre', 'nomcomp')
  .addSelect('componente.url_imagencom', 'url_imagencom')
  .addSelect('componente.descripcion', 'descomp')
  .addSelect('componente.precio_venta')
  .addSelect('componente.stock')
  .addSelect('subcat.usuario_id', 'usersubcat')
  .addSelect('subcat.nombre', 'subcatnombre')
  .addSelect('subcat.imagen', 'subcatimg')
  .addSelect('subcat.nombrejunto', 'subcatnomjunto')
  .addSelect('cat.nombre', 'nomcat')
  .addSelect('cat.id', 'idcat')
  .innerJoin('subcategoria', 'subcat', 'componente.subcategoria_id = subcat.id')
  .innerJoin('categoria', 'cat', 'subcat.categoria_id = cat.id')
  .where('componente.stock > 0')
  .andWhere('componente.estado = :estado', { estado: 'A' })
  .orderBy('componente.id', 'ASC')
  .getQuery();

const entityManager = getManager();
const results = await entityManager.query(query);
*/