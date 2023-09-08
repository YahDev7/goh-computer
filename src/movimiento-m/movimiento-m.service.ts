import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { MovimientoM, MovimientoMDocument } from './schema/movimiento-m.schema';
import { CustomerService } from 'src/customer/customer.service';
import { MovimientoMDto, UpdateMovimientoMDto } from './dto/movimiento-m.dto';
import { DocumentoService } from 'src/documento/documento.service';
import { JwtService } from '@nestjs/jwt';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class MovimientoMService {
    constructor(
        @InjectModel(MovimientoM.name) private MovimientoModule: Model<MovimientoMDocument>,
        private EnterpriseService: EnterpriseService,
        private DocumentoService: DocumentoService,
       // private ProductService: ProductsService,
        private CustomerService: CustomerService,
        private jwtService: JwtService,

    ) { }

    async get(): Promise<MovimientoM[] | HttpException> {
        try {
            const res = await this.MovimientoModule.find();
            if (res.length === 0) return new HttpException('No hay depostios que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar movimientos', HttpStatus.NOT_FOUND)
        }
    }


    async getId(id: string): Promise<MovimientoM | HttpException> {
        try {

            /*        let est= await this.MovimientoModule.findOne({_id:id,estado:'D'});
                   if(est)return new HttpException('No se encontro deposito',HttpStatus.NOT_FOUND)   
        */
            let found = await this.MovimientoModule.findOne({ _id: id });
            if (!found) return new HttpException('No se encontro deposito', HttpStatus.NOT_FOUND);

            return found
        } catch (error) {
            return new HttpException('Ocurrio un error al listar por id' + error, HttpStatus.NOT_FOUND)
        }
    }
    async getByEnterprise(token): Promise<MovimientoM[] | HttpException> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id } = decodedToken

            let res = await this.EnterpriseService.getId(enterprise_id);

            if (res instanceof HttpException) throw res

            const found = await this.MovimientoModule.find({ enterprise_id:new ObjectId(enterprise_id)  })
            if (found.length === 0) throw { err: true, message: 'No se encontraron depositos' }

            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id enterprise' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async save(body: MovimientoMDto): Promise<MovimientoM | Object> {
        try {
            //VALIDAR QUE EL DOCUMENTO SI EXISTA
            let { documento_id, enterprise_id } = body
            documento_id = new ObjectId(documento_id)
            enterprise_id = new ObjectId(enterprise_id)

            const save = await this.MovimientoModule.create({ ...body, documento_id, enterprise_id });
            if (!save) throw { err: true, message: 'No se guardardo' }


            const update = await this.DocumentoService.updateEstado(documento_id);
            if (update.err) throw update.message

            return { err: false, message: "Se guardo con éxito", data: save._id }
        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async saveimg(enterprise_id: ObjectId, mov_id: ObjectId, files: Object): Promise<MovimientoM | Object> {
        try {
            let found = await this.getByEnterprise(enterprise_id)
            if (!found) throw { err: true, message: 'No se encontor esta empresa' }

            let foundpro = await this.MovimientoModule.findOne({ _id: mov_id });
            if (!foundpro) throw { err: true, message: 'No se encontor este producto' }


            const update = await this.MovimientoModule.updateOne({ _id: mov_id }, { $set: { fileAdjunto: files } });
            if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);

            return { err: false, message: "Se actualizo con éxito" }
            /*  if (!save) throw { err: true, message: 'No se guardardo' }
             return save */
            /* return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async saveVentaByUserByEnterprise(token, body: UpdateMovimientoMDto) {
        try {

            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id, usuario_id } = decodedToken;
            enterprise_id = new ObjectId(enterprise_id)
            usuario_id = new ObjectId(usuario_id)

            let { documento_id } = body
            documento_id = new ObjectId(documento_id)

            let resEnterprise = await this.EnterpriseService.getId(enterprise_id)
            if (resEnterprise instanceof HttpException) throw resEnterprise

            let docConfirm = await this.DocumentoService.getConfirm(documento_id)
            if (docConfirm.err) throw { message: docConfirm.message }


            /*  let resuser = await this.UserService.getId(usuario_id)
             if (resuser instanceof HttpException) throw resuser */


            const save = await this.MovimientoModule.create({ ...body, documento_id, enterprise_id });
            if (!save) throw { err: true, message: 'No se guardardo' }

            const update = await this.DocumentoService.updateEstado(documento_id);
            if (update.err) throw update.message

            return { err: false, message: "Se guardo con éxito", data: save._id }

            /*  return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }




    async getByCustomer(customer_id: ObjectId): Promise<MovimientoM[] | HttpException> {
        try {
            let res = await this.CustomerService.getId(customer_id);
            if (res instanceof HttpException) throw res

            let res2 = await this.MovimientoModule.aggregate([

                {
                    $lookup: {
                        from: 'documentos',
                        localField: 'documento_id',
                        foreignField: '_id',
                        as: 'doc'
                    }
                },

                {
                    $project: {
                        _id: 0,
                        iddoc: { $arrayElemAt: ['$doc._id', 0] },
                        customer_id: { $arrayElemAt: ['$doc.customer_id', 0] },
                        enterprise_id: 1,
                        fecha: 1,
                        nro_operacion: 1,
                        metodo_pago: 1,
                        estado: 1,
                        fecha_deposito: 1,
                        monto_deposito: 1,
                        monto_pagar: 1,
                    }
                },
                {
                    $match: {
                        customer_id,
                    }
                },
            ]);
            if (res2.length === 0) throw { err: true, message: "No hay depositos a mostrar" }
            return res2


        } catch (error) {
            return new HttpException('Ocurrio un error ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }





    async totalCompras() {//MAIN
        try {

            const res = await this.MovimientoModule.find({ tipo_compra_venta: 'COMPRA' });
            const total = res.reduce((acc, movimiento) => acc + movimiento.monto_pagar, 0);
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return { total }
            /*      let comprasIds = await this.getComprasIds();
                 let comprasIdsNew = comprasIds.map(doc => doc._id);
     
                 let res = await this.MovimientoModule.aggregate([
     
                     {
                         $match: {
                             _id: { $in: [new ObjectId(...comprasIdsNew)] }
                         }
                     },
                     {
                         $group: {
                             _id: null,
                             total_ganancia: { $sum: "$monto_pagar" }
                         }
                     },
                     {
                         $project: {
                             _id: 0,
                             total_ganancia: 1
                         }
                     }
                 ])
     
                 return res */
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }
    async totalVentas() {//MAIN
        try {
            const res = await this.MovimientoModule.find({ tipo_compra_venta: 'VENTA',estado:"CANCELADO" });
            const total = res.reduce((acc, movimiento) => acc + movimiento.monto_pagar, 0);
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return { total }
            /*  let ventasIds = await this.getVentasIds();
             let ventasIdsNew = ventasIds.map(doc => doc._id);
             let res = await this.MovimientoModule.aggregate([
 
                 {
                     $match: {
                         _id: { $in: [new ObjectId(...ventasIdsNew)] }
                     }
                 },
                 {
                     $group: {
                         _id: null,
                         total_ganancia: { $sum: "$monto_pagar" }
                     }
                 },
                 {
                     $project: {
                         _id: 0,
                         total_ganancia: 1
                     }
                 }
             ])
 
             return res */

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }


    async totalVentasDia() {//MAIN
        try {

            const res = await this.MovimientoModule.find({ tipo_compra_venta: 'VENTA', fecha: { $gte: new Date() },estado:"CANCELADO" });
            const total = res.reduce((acc, movimiento) => acc + movimiento.monto_pagar, 0);
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return { total }
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async totalVentasMes() {//MAIN
        try {

            let res = await this.MovimientoModule.aggregate([
                {
                    $match: {
                        fecha: { $gte: new Date("2023-01-01"), $lt: new Date("2023-12-01") },
                        tipo_compra_venta: "VENTA",
                        estado:"CANCELADO"
                    }
                },
                {
                    $group: {
                        _id: { $month: "$fecha" },
                        // fechas: {$push:'$fecha'},
                        Totalmes: { $sum: "$monto_pagar" }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                },
            ]);
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }


    async totalComprasDia() {//MAIN
        try {

            const res = await this.MovimientoModule.find({ tipo_compra_venta: 'COMPRA', fecha: { $gte: new Date() },estado:"CANCELADO" });
            const total = res.reduce((acc, movimiento) => acc + movimiento.monto_pagar, 0);
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return { total }
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async totalComprasMes() {//MAIN
        try {

            let res = await this.MovimientoModule.aggregate([
                {
                    $match: {
                        fecha: { $gte: new Date("2023-01-01"), $lt: new Date("2023-12-01") },
                        tipo_compra_venta: "COMPRA",
                        estado:"CANCELADO"
                    }
                },
                {
                    $group: {
                        _id: { $month: "$fecha" },
                        // fechas: {$push:'$fecha'},
                        Totalmes: { $sum: "$monto_pagar" }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                },
            ]);
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }
    async ingresosMensuales() {//MAIN
        try {

            let res = await this.MovimientoModule.aggregate([
                {
                    $match: {
                        fecha: { $gte: new Date("2023-01-01"), $lt: new Date("2023-12-01") },
                        estado:"CANCELADO"
                    }
                },
                {
                    $group: {
                        _id: { $month: "$fecha" },
                        TotalCompra: { $sum: { $cond: { if: { $eq: ["$tipo_compra_venta", "COMPRA"] }, then: { $sum: "$monto_pagar" }, else: { $literal: 0 } } } },
                        TotalVenta: { $sum: { $cond: { if: { $eq: ["$tipo_compra_venta", "VENTA"] }, then: { $sum: "$monto_pagar" }, else: { $literal: 0 } } } }
                      }
                },
                {
                    $addFields:{
                     Total :{$round:[{$subtract:['$TotalVenta','$TotalCompra']},2]},
                     TotalCompra:{$round:["$TotalCompra",2]},
                     TotalVenta:{$round:["$TotalVenta",2]} 
                    }
                 },
                {
                    $sort: {
                        _id: 1
                    }
                },
            ]);
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }




    async totalVentasServicios() {//MAIN
        try {
        let res = await this.MovimientoModule.aggregate([
            {
                $match: {
                    estado: 'CANCELADO',
                    enterprise_id: new ObjectId("6463b7176f62eabdc5d7329d"),
                }
            },
             {
              $lookup: {
                  from: "documentos",
                  localField: "documento_id",
                  foreignField: "_id",
                  as: "doc"
              }
          },
           {
            $lookup: {
                from: "product",
                pipeline:[{
                    $match:{'unidad':'SERVICIO'}
                }],
                localField: "doc.detalle.id",
                foreignField: "_id",
                as: "prod"
            }
        }, 
        {
            $project: {
                _id: 0,
                monto_pagar:1
               
            }
        }
        ])

            const total = res.reduce((acc, movimiento) => acc + movimiento.monto_pagar, 0);
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
            return { total }
           
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }


























    /*  async getVentasIds() {
      try {
          //const res = await this.MovimientoModule.find({ tipo_compra_venta: 'VENTA' }, { _id: 1 });
          const res = await this.MovimientoModule.find({ tipo_compra_venta: 'VENTA' });
          const total = res.reduce((acc, movimiento) => acc + movimiento.monto_pagar, 0);
          console.log(total)
          //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 
          return res
      } catch (error) {
          return
          //return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
      }
  } */
    async getComprasIds() {
        try {
            const res = await this.MovimientoModule.find({ tipo_compra_venta: 'COMPRA' }, { _id: 1 });
            //if(res.length===0) return new HttpException('No hay Documentos que mostrar',HttpStatus.NOT_FOUND) 

            return res
        } catch (error) {
            return
            //return new HttpException('Ocurrio un error al listar',HttpStatus.NOT_FOUND) 
        }
    }


}
