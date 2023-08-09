import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria, CategoriaDocument } from './schema/categoria.schema';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectModel(Categoria.name) private CategoriaModule: Model<CategoriaDocument>,
        private jwtService: JwtService,
        private EnterpriseService: EnterpriseService

    ) { }

    async get(): Promise<Categoria[] | HttpException> {
        try {
            const res = await this.CategoriaModule.find();
            if (res.length === 0) return new HttpException('No hay datos que mostrar', HttpStatus.NOT_FOUND)
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async getId(id: ObjectId): Promise<Categoria | HttpException> {
        try {

            let est = await this.CategoriaModule.findOne({ _id: id, estado: 'D' });
            if (est) return new HttpException('No se encontro registro', HttpStatus.NOT_FOUND)

            let found = await this.CategoriaModule.findOne({ _id: id });
            if (!found) return new HttpException('No se encontro registro', HttpStatus.NOT_FOUND);

            return found
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }


    async getByIdByEnterprise(enterprise_id: ObjectId): Promise<Categoria[] | HttpException> {
        try {
            let res = await this.EnterpriseService.getId(enterprise_id);
            if (res instanceof HttpException) throw res
            // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found = await this.CategoriaModule.find({ enterprise_id, estado: 'A' })
            if (found.length === 0) throw { err: true, message: 'No se encontraron subcategorias de esta empresa' }
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async getByEnterprise(token): Promise<Categoria[] | HttpException> {
        try {

            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id, usuario_id } = decodedToken
            enterprise_id = new ObjectId(enterprise_id)

            let res = await this.EnterpriseService.getId(enterprise_id);
            if (res instanceof HttpException) throw res
            // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found = await this.CategoriaModule.find({ enterprise_id, estado: 'A' })
            if (found.length === 0) throw { err: true, message: 'No se encontraron subcategorias de esta empresa' }
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
    async post(body: CategoriaDto): Promise<Categoria | Object> {
        try {

            const insert = this.CategoriaModule.create(body);
            if (!insert) return new HttpException('Ocurrio un error al guardar ', HttpStatus.NOT_FOUND)
            return insert
            /*  return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
    async update(id: number, body: UpdateCategoriaDto): Promise<Categoria | HttpException | Object> {
        try {

            const found = await this.CategoriaModule.findOne({ _id: id, estado: 'A' })
            if (!found) throw { err: true, message: 'No se encontor esta empresa' }

            const update = await this.CategoriaModule.updateOne({ _id: id }, { $set: body });
            if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);

            return { err: false, message: "Se actualizo con éxito" }

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async delete(id: ObjectId): Promise<Object> {
        try {

            const found = await this.CategoriaModule.findOne({ _id: id })
            if (!found) throw { err: true, message: 'No se encontor esta categoria' }

            let est = await this.CategoriaModule.findOne({ _id: id, estado: 'D' });
            if (est) return new HttpException('No se encontro registro a eliminar', HttpStatus.NOT_FOUND)

            const update = await this.CategoriaModule.updateOne({ _id: id }, { $set: { estado: 'D' } });
            if (!update) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);

            return { err: false, message: "Se elimino con éxito" }
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar ' + error.message || error, HttpStatus.NOT_FOUND)
        }

    }

    async deleteImg(id: ObjectId): Promise<Object> { //probar
        try {

            const found = await this.CategoriaModule.findOne({ id, estado: 'A' })
            if (!found) throw { err: true, message: 'No se encontor esta subcategoria' }

            if (!found.imagen) throw { err: true, message: 'no hay img que eliminar' }
            found.imagen = null;
            return { err: false, message: 'imagen eliminado' }
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar ' + error.message || error, HttpStatus.NOT_FOUND)
        }

    }

    async getByEnterpriseId(id:ObjectId,token): Promise<Categoria | HttpException> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id, usuario_id } = decodedToken
            enterprise_id = new ObjectId(enterprise_id)

            //const found = await this.CategoriaModule.findOne({ _id: usuario_id, estado: 'A' })

            //if (!found) throw { err: true, message: 'error al buscar este user' }
            //if (decodedToken.enterprise_id !== found.enterprise_id.toString()) throw { err: true, message: 'unauthorizedr' }

            const cat = await this.CategoriaModule.findOne({_id:id,enterprise_id,estado:"A"})
            return cat;

        } catch (error) {
            return new HttpException('Ocurrio un error ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async postByEnterprise(body: CategoriaDto,token): Promise<Categoria | Object> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let {enterprise_id,usuario_id} =decodedToken;

            enterprise_id = new ObjectId(enterprise_id)
            usuario_id = new ObjectId(usuario_id)

           body={...body,enterprise_id,usuario_id } 
            
            const insert =await this.CategoriaModule.create(body);
            if (!insert) return new HttpException('Ocurrio un error al guardar ', HttpStatus.NOT_FOUND)
            return insert
            /*  return {err:false,message:"Se guardo con éxito"} */
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async updateByEnterprise(id: ObjectId, body: CategoriaDto, token): Promise<Object | HttpException> {
        try {
            const decodedToken = this.jwtService.verify(token);
  
            const update = await this.CategoriaModule.updateOne({ _id: id }, { $set: body });
            console.log(update)
            if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);
            return { err: false, message: "Se actualizo con éxito" }

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async deleteByEnterprise(id: ObjectId, token): Promise<Object|HttpException> {
        try {
          //  id=new ObjectId(id)
          //  const decodedToken = this.jwtService.verify(token);
           
          const update = await this.CategoriaModule.updateOne({ _id: id }, { $set: {estado:'D'} });
          console.log(update)
          if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);
          return { err: false, message: "Se actualizo con éxito" }
        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al eliminar ' + error.message || error, HttpStatus.NOT_FOUND)
        }

    }
}
