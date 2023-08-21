import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Promociones, PromocionesDocument } from './schema/promociones.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { ObjectId } from 'mongodb';
import { PromocionesDto, UpdatePromocionesDto } from './dto/promociones.dto';

@Injectable()
export class PromocionesService {
    constructor(
        @InjectModel(Promociones.name) private PromocionesModule: Model<PromocionesDocument>,
        private jwtService: JwtService,
        private UserService: UserService,
        private EnterpriseService: EnterpriseService,

    ) { }

    async getEnterprise(token): Promise<Promociones[] | HttpException> {
        try {

            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id } = decodedToken
            enterprise_id = new ObjectId(enterprise_id)

            const res = await this.PromocionesModule.find({ enterprise_id, estado: 'A' });
            if (res.length === 0) return new HttpException('No hay productos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar', HttpStatus.NOT_FOUND)
        }
    }


    async getByEnterpriseById(id: ObjectId, token): Promise<Promociones | HttpException> {
        try {

            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id } = decodedToken
            enterprise_id = new ObjectId(enterprise_id)

            const res = await this.PromocionesModule.findOne({ _id: id, enterprise_id, estado: 'A' });
            if (res) return new HttpException('No hay productos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar', HttpStatus.NOT_FOUND)
        }
    }

    async saveEnterprise(body: PromocionesDto,token): Promise<Promociones | Object> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id } = decodedToken
            let {  producto_id } = body

            enterprise_id = new ObjectId(enterprise_id)
            producto_id = new ObjectId(producto_id)


            const save = await this.PromocionesModule.create({ ...body, enterprise_id, producto_id });
            if (!save) throw { err: true, message: 'No se guardardo' }
            return save
            /* return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }


    async updateEnterprise(id: ObjectId, body: UpdatePromocionesDto,token): Promise<Promociones | Object> {
        try {
            let { producto_id } = body
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id } = decodedToken
            enterprise_id = new ObjectId(enterprise_id)
            producto_id = new ObjectId(producto_id)
            id = new ObjectId(id)

            let found = await this.PromocionesModule.findOne({ _id: id, estado: "A" });
            if (!found) return new HttpException('No existe este product', HttpStatus.NOT_FOUND);

            const update = await this.PromocionesModule.updateOne({ _id: id }, {
                $set: {
                    ...body,
                    enterprise_id,
                    producto_id
                }
            });
            if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);

            return { err: false, message: "Se actualizo con éxito" }
        } catch (error) {
            return new HttpException('Ocurrio un error al update, ' + error.message || error, HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: ObjectId,token) {
        try {
            id = new ObjectId(id)

          let found = await this.PromocionesModule.findOne({ _id: id });
          if (!found) return new HttpException('No se encontro registro a eliminar', HttpStatus.NOT_FOUND);
    
          let est = await this.PromocionesModule.findOne({ _id: id, estado: 'D' });
          if (est) return new HttpException('No se encontro registro a eliminar', HttpStatus.NOT_FOUND)
    
    
          const update = await this.PromocionesModule.updateOne({ _id: id }, { $set: { estado: 'D' } });
          if (!update) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);
          return { err: false, message: "Se elimino con éxito" }
        } catch (error) {
          return new HttpException('Ocurrio un error al eliminar, VERIFIQUE', HttpStatus.NOT_FOUND);
        }
    
      }
}
