import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from './dto/user.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/schema.user';
import { ObjectId } from 'mongodb';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        //@InjectRepository(User)
        @InjectModel(User.name) private UserModule: Model<UserDocument>,
        private jwtService: JwtService,

        // private UserModule:Repository<User>,
        private EnterpriseService: EnterpriseService


    ) { }

    async get(): Promise<User[] | HttpException> {
        try {
            const res = await this.UserModule.find();
            if (res.length === 0) throw { err: true, message: 'No hay datos que mostrar' }
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al listar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async getUser(body) {
        try {
            const found = await this.UserModule.findOne({ email:body.email, estado: 'A' })

            if (!found) throw { err: true, message: 'error al buscar este user' }
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async getId(id: ObjectId)/* : Promise<User | HttpException> */ {
        try {
            const found = await this.UserModule.findOne({ _id:id, estado: 'A' })
            if (!found) throw { err: true, message: 'error al buscar este user' }
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async verifyUnique(param: { [key: string]: any }): Promise<User> { //param es un obj con keys "string" y sus valores de cualquier tipo
        try {

            const verify = await this.UserModule.findOne(param)
            return verify;
        } catch (error) {

        }
    }
    async verifyAll(body/* : CreateUserDto */) { //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const { dni, email, telefono } = body;
            const verifyNomb = await this.verifyUnique({ dni })
            if (verifyNomb) return { err: true, message: 'dni utilizado' }

            const verifyruc = await this.verifyUnique({ email })
            if (verifyruc) return { err: true, message: 'email utilizado' }

            const verifyemail = await this.verifyUnique({ telefono })
            if (verifyemail) return { err: true, message: 'telefono utilizado' }

            return { err: false, message: 'nice' }

        } catch (error) {
            return error
        }
    }

    async verifyAllUpdate(body: UpdateUserDto, id: ObjectId) { //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const { dni, email, telefono } = body;

            const verifyNomb = await this.verifyUnique({ dni })
            if (verifyNomb) if (verifyNomb["_id"] !== id) return { err: true, message: 'dni utilizado' };

            const verifyremail = await this.verifyUnique({ email, id })
            if (!verifyremail) if (verifyremail["_id"] !== id) return { err: true, message: 'email utilizado' }

            const verifytelefono = await this.verifyUnique({ telefono, id })
            if (!verifytelefono) if (verifytelefono["_id"] !== id) return { err: true, message: 'telefono utilizado' }

            return { err: false, message: 'nice' }

        } catch (error) {
            return error
        }
    }

    async post(body: RegisterUserDto): Promise<User | Object> {
        try {
            let { enterprise_id, password } = body
            let resEnterprise = await this.EnterpriseService.getId(enterprise_id);
            if (resEnterprise instanceof HttpException) throw resEnterprise

            const res = await this.verifyAll(body);
            if (res.err) throw res;

            enterprise_id = new ObjectId(enterprise_id)
            password = await hash(password, 10)

            body = { ...body, enterprise_id, password }
            const insert = this.UserModule.create(body);
            if (!insert) return new HttpException('Ocurrio un error al guardar ', HttpStatus.NOT_FOUND)
            return insert
            //return {err:false,message:"Se guardo con éxito"}

            /*   const insert=this.UserModule.create(body);
              if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
              return this.UserModule.save(insert) */
        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
    async update(id: ObjectId, body: UpdateUserDto): Promise<Object | HttpException> {
        try {

            const found = await this.UserModule.findOne({ where: { _id: id, estado: 'A' } })
            if (!found) throw { err: true, message: 'No se encontor este user' }
            const res = await this.verifyAllUpdate(body, id);
            if (res.err) throw res;

            const update = await this.UserModule.updateOne({ _id: id }, { $set: body });
            if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);

            return { err: false, message: "Se actualizo con éxito" }

            /*  let resUpdate=Object.assign(found,body);
             return this.UserModule.save(resUpdate); */

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async delete(id: ObjectId): Promise<Object> {
        try {

            const found = await this.UserModule.findOne({ _id: id, estado: 'A' })
            if (!found) throw { err: true, message: 'No se encontor esta empresa' }

            const update = await this.UserModule.updateOne({ _id: id }, { $set: { estado: 'D' } });
            if (!update) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);

            /*  let resUpdate=Object.assign(found,{estado:'D'});
             const resfinal= await this.UserModule.save(resUpdate); */

            return { err: false, message: 'Enterprise eliminado' }
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar ' + error.message || error, HttpStatus.NOT_FOUND)
        }

    }

    async login(body: LoginUserDto) {
        //ESTO NECESITO PASA
        try {
            let { email, password } = body

            const finduser = await this.UserModule.findOne({ email })
            if (!finduser) throw { err: true, message: "Errror de autentication" }
            let comparepass = await compare(password, finduser.password)
            if (!comparepass) throw { err: true, message: "Errror de autentication" }

            let payload = {
                usuario_id: finduser._id,
                nombre: finduser.nombre,
                enterprise_id: finduser.enterprise_id,
                rol: finduser.rol
            }
            let token = this.jwtService.sign(payload)

            const data = {
                user: payload,
                token
            }
            return data
        } catch (error) {
            console.log(error)
            return new HttpException('Error de autentication ' + error.message || error, HttpStatus.NOT_FOUND)

        }
    }




    async getByEnterprise(token): Promise<User[] | HttpException> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id, usuario_id } = decodedToken
            enterprise_id = new ObjectId(enterprise_id)
            const found = await this.UserModule.findOne({ _id: usuario_id, estado: 'A' })
            if (!found) throw { err: true, message: 'error al buscar este user' }
            if (decodedToken.enterprise_id !== found.enterprise_id.toString()) throw { err: true, message: 'unauthorizedr' }

            const users = await this.UserModule.find({estado: 'A',enterprise_id })

            return users;
        } catch (error) {
            return new HttpException('Ocurrio un error ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async getByEnterpriseId(id:ObjectId,token): Promise<Object | HttpException> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id, usuario_id } = decodedToken
            enterprise_id = new ObjectId(enterprise_id)
            id=new ObjectId(id)
            const found = await this.UserModule.findOne({ _id: usuario_id, estado: 'A' })

            if (!found) throw { err: true, message: 'error al buscar este user' }
            if (decodedToken.enterprise_id !== found.enterprise_id.toString()) throw { err: true, message: 'unauthorizedr' }

            
          //  const user = await this.UserModule.findOne({_id:id,enterprise_id})
 
            let user = await this.UserModule.aggregate([
                {
                  $match: {
                    _id:id,
                    enterprise_id
                  }
                },
                {
                  $project: {
                    password: 0,
                  }
                },
              ]); 
 


            if (!user[0]) throw { err: true, message: 'error al buscar este user' }

            return user[0];

        } catch (error) {
            return new HttpException('Ocurrio un error ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }


    async CreateByenterprise(body: CreateUserDto): Promise<User | Object> {
        try {

            const insert = await this.UserModule.create(body);
            if (!insert) throw { err: true, message: 'No se guardardo el usuario' }
            return {err:false,message:"se creo con exito"}
         
        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
    async postByEnterprise(body: CreateUserDto, token): Promise<User | Object> {
        try {
            const {password } = body
            /*   let resEnterprise =await this.EnterpriseService.getId(enterprise_id);
              if(resEnterprise instanceof HttpException) throw resEnterprise */

            /*    const res=await this.verifyAll(body);
               if(res.err) throw res; */
            const decodedToken = this.jwtService.verify(token);
           // if (decodedToken.enterprise_id !== enterprise_id.toString()) throw { err: true, message: 'unauthorized' }
            let  {enterprise_id}=decodedToken

            enterprise_id = new ObjectId(enterprise_id)

            let passhash = await hash(password, 10)

            let newbody = { ...body, password: passhash,enterprise_id }
            const insert = await this.UserModule.create(newbody);
            if (!insert) throw { err: true, message: 'No se guardardo el usuario' }
            //throw new   NotFoundExeption("no exite bro, para obtener un 404")
            return {err:false,message:"se creo con exito"}
            //return {err:false,message:"Se guardo con éxito"}

            /*   const insert=this.UserModule.create(body);
              if(!insert) return new HttpException('Ocurrio un error al guardar ',HttpStatus.NOT_FOUND)
              return this.UserModule.save(insert) */
        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
    async updateByEnterprise(id: ObjectId, body: UpdateUserDto, token): Promise<Object | HttpException> {
        try {
            const decodedToken = this.jwtService.verify(token);

            const found = await this.UserModule.findOne({ _id: id, estado: 'A'  })
            if (!found) throw { err: true, message: 'No se encontor este user' }

            if (decodedToken.enterprise_id !== found.enterprise_id.toString()) throw { err: true, message: 'unauthorized' }

           /* 
            QUE EL DNI NO ESTE SIENDO UTILIZADO POR OTOR A EXCEPCION DEL MISMO
           const res = await this.verifyAllUpdate(body, id);
            if (res.err) throw res; */ 
  
            const update = await this.UserModule.updateOne({ _id: id }, { $set: body });
            if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);
            return { err: false, message: "Se actualizo con éxito" }

            /*  let resUpdate=Object.assign(found,body);
             return this.UserModule.save(resUpdate); */

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
    async deleteByEnterprise(id: ObjectId, token): Promise<Object> {
        try {
            id=new ObjectId(id)
            const decodedToken = this.jwtService.verify(token);
            const found = await this.UserModule.findOne({ _id: id, estado: 'D' })

            if (found) throw { err: true, message: 'No se encontor este usuario' }

           // if (decodedToken.enterprise_id !== found.enterprise_id.toString()) throw { err: true, message: 'unauthorized' }


            const update = await this.UserModule.updateOne({ _id: id }, { $set: { estado: 'D' } });
            if (!update) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);

            /*  let resUpdate=Object.assign(found,{estado:'D'});
             const resfinal= await this.UserModule.save(resUpdate); */

            return { err: false, message: 'Enterprise eliminado' }
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar ' + error.message || error, HttpStatus.NOT_FOUND)
        }

    }

       async getDataUser(token): Promise<Object> {
        try {
            const decodedToken = this.jwtService.verify(token);
            //const {nombre}= decodedToken
            return decodedToken
        } catch (error) {
            return new HttpException('Ocurrio un error ' + error.message || error, HttpStatus.NOT_FOUND)
        }

    }
}






/*    async getByEnterpriseAdmin(enterprise_id: ObjectId): Promise<User[] | HttpException> {
       try {
           let res = await this.EnterpriseService.getId(enterprise_id);
           if (res instanceof HttpException) throw res
           // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

           let newenterprise_id = new ObjectId(enterprise_id)

           const found = await this.UserModule.find({ enterprise_id:newenterprise_id, estado: 'A' })
           if (found.length === 0) throw { err: true, message: 'No se encontro usuarios en esta empresa' }
           return found;
       } catch (error) {
           return new HttpException('Ocurrio un error ' + error.message || error, HttpStatus.NOT_FOUND)
       }
   } */



/* ENTERPRISE */


/*     async getByEnterprise(): Promise<User[] | HttpException> {
        try {
            //let res = await this.EnterpriseService.getId(enterprise_id);
            //if (res instanceof HttpException) throw res
            // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            let newenterprise_id = new ObjectId(enterprise_id)

            const found = await this.UserModule.find({ enterprise_id:newenterprise_id, estado: 'A' })
            if (found.length === 0) throw { err: true, message: 'No se encontro usuarios en esta empresa' }
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    } */