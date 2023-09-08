import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerDto, LoginCustomerDto, RegisterCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomeraDocument } from './schema/schema.customer';
import { ObjectId } from 'mongodb';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) private CustomerModule: Model<CustomeraDocument>,
        private jwtService: JwtService,
        /*  @InjectRepository(Customer)
         private CustomerModule:Repository<Customer>, */
        private EnterpriseService: EnterpriseService

    ) { }

    async get(): Promise<Customer[] | HttpException> {
        try {
            const res = await this.CustomerModule.find();
            if (res.length === 0) throw { err: true, message: 'No hay datos que mostrar' }
            return res
        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async getId(id: ObjectId): Promise<Customer | HttpException> {
        try {

            const found = await this.CustomerModule.findOne({ _id: id, estado: 'A' })
            if (!found) throw { err: true, message: 'No se encontor este customer' }
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar por id id custoemr solo id' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
    async verifyUnique(param: { [key: string]: any }): Promise<Customer> { //param es un obj con keys "string" y sus valores de cualquier tipo
        try {

            const verify = await this.CustomerModule.findOne(param)
            return verify;
        } catch (error) {

        }
    }
    async verifyAll(body: CustomerDto) { //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const { dni_ruc, email, telefono } = body;
            const verifyNomb = await this.verifyUnique({ dni_ruc })
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

    async verifyAllUpdate(body: UpdateCustomerDto, id: number) { //param es un obj con keys "string" y sus valores de cualquier tipo
        try {
            const { dni_ruc, email, telefono } = body;

            const verifyNomb = await this.verifyUnique({ dni_ruc })
            if (verifyNomb) if (verifyNomb['_id'] !== id) return { err: true, message: 'dni utilizado' };

            const verifyremail = await this.verifyUnique({ email, id })
            if (!verifyremail) if (verifyremail['_id'] !== id) return { err: true, message: 'email utilizado' }

            const verifytelefono = await this.verifyUnique({ telefono, id })
            if (!verifytelefono) if (verifytelefono['_id'] !== id) return { err: true, message: 'telefono utilizado' }

            return { err: false, message: 'nice' }

        } catch (error) {
            return error
        }
    }

    async post(body: RegisterCustomerDto): Promise<Customer | Object> {
        try {
            //const res=await this.verifyAll(body);
            //if(res.err) throw res;

            let { enterprise_id, password } = body
            enterprise_id = new ObjectId(enterprise_id)
            password = await hash(password, 10)

            body = { ...body, password, enterprise_id }
            let insert = await this.CustomerModule.create(body)

            if (!insert) throw { err: true, message: "ocurrio un error al registrarce en la web" }

            return { err: false, message: "Registro con exito" }

        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
/*     async update(id: ObjectId, body: UpdateCustomerDto): Promise<Customer | HttpException | Object> {
        try {

            const found = await this.CustomerModule.findOne({ where: { id, estado: 'A' } })
            if (!found) throw { err: true, message: 'No se encontor esta empresa' }
            const res = await this.verifyAllUpdate(body, id);
            if (res.err) throw res;

            const update = await this.CustomerModule.updateOne({ _id: id }, { $set: body });
            if (update.modifiedCount === 0) return new HttpException('No se logro actualizar', HttpStatus.NOT_FOUND);

            return { err: false, message: "Se actualizo con éxito" }

        } catch (error) {
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    } */

    async delete(id: number): Promise<Object> {
        try {

            const found = await this.CustomerModule.findOne({ where: { id, estado: 'A' } })
            if (!found) throw { err: true, message: 'No se encontor esta empresa' }

            const update = await this.CustomerModule.updateOne({ _id: id }, { $set: { estado: 'D' } });
            if (!update) return new HttpException('ocurrio un error al eliminar', HttpStatus.NOT_FOUND);

            return { err: false, message: 'Enterprise eliminado' }
        } catch (error) {
            return new HttpException('Ocurrio un error al eliminar ' + error.message || error, HttpStatus.NOT_FOUND)
        }

    }

    async login(body: LoginCustomerDto) {
        try {
            let { email, password } = body

            const finduser = await this.CustomerModule.findOne({ email })
            if (!finduser) throw { err: true, message: "Errror de autentication" }

            let comparepass = await compare(password, finduser.password)
            if (!comparepass) throw { err: true, message: "Errror de autentication" }

            let payload = {
                id: finduser._id,
                email: finduser.email,
                nombre: finduser.nombres,
                enterprise_id: finduser.enterprise_id
            }

            let token = this.jwtService.sign(payload)
            let { _id, enterprise_id, nombres, ...user } = finduser
            const data = {
                user: { _id, enterprise_id, nombres },
                token
            }
            return data
        } catch (error) {
            console.log(error)
            return new HttpException('Error de autentication ' + error.message || error, HttpStatus.NOT_FOUND)

        }
    }



    async getByEnterprise(token: string /* enterprise_id: ObjectId */): Promise<Customer[] | HttpException> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id } = decodedToken;
            enterprise_id = new ObjectId(enterprise_id)
            let res = await this.EnterpriseService.getId(enterprise_id);
            if (res instanceof HttpException) throw res
            // if(res) throw {err:true,message:'No se encontraron subcategorias de esta empresa'} 

            const found = await this.CustomerModule.find({ enterprise_id, estado: 'A' })
            if (found.length === 0) throw { err: true, message: 'No se encontraron subcategorias de esta empresa' }
            return found;
        } catch (error) {
            return new HttpException('Ocurrio un error al buscar' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }

    async getIdEnterprise(id: ObjectId): Promise<Customer | HttpException> {
        try {

            const found = await this.CustomerModule.findOne({ _id: id, estado: 'A' })
            if (!found) throw { err: true, message: 'No se encontor este customer' }
            return found;
        } catch (error) {
            console.log(error)

            return new HttpException('Ocurrio un error al buscar por id cutomer ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
    async postEnterprise(token, body: CustomerDto): Promise<Customer | Object> {
        try {
            const decodedToken = this.jwtService.verify(token);
            let { enterprise_id, usuario_id } = decodedToken
            let { password } = body

            enterprise_id = new ObjectId(enterprise_id)
            password = await hash(password, 10)

            let newbody = { ...body, password, enterprise_id }
            const save = await this.CustomerModule.create(newbody);
            if (!save) throw { err: true, message: 'No se guardardo' }
            return { err: false, message: "Se guardo con éxito" }

        } catch (error) {
            console.log(error)
            return new HttpException('Ocurrio un error al guardar ' + error.message || error, HttpStatus.NOT_FOUND)
        }
    }
    async updateByEnterprise(id: ObjectId, body: UpdateCustomerDto, token): Promise<Object | HttpException> {
        try {
            const decodedToken = this.jwtService.verify(token);

            const found = await this.CustomerModule.findOne({ _id: id, estado: 'A'  })
            if (!found) throw { err: true, message: 'No se encontor este customer' }

            if (decodedToken.enterprise_id !== found.enterprise_id.toString()) throw { err: true, message: 'unauthorized' }

           /* 
            QUE EL DNI NO ESTE SIENDO UTILIZADO POR OTOR A EXCEPCION DEL MISMO
           const res = await this.verifyAllUpdate(body, id);
            if (res.err) throw res; */ 
  
            const update = await this.CustomerModule.updateOne({ _id: id }, { $set: body });
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
           /*  const found = await this.UserModule.findOne({ _id: id, estado: 'A' })
            console.log(found) */

            //if (!found) throw { err: true, message: 'No se encontor este usuario' }

           // if (decodedToken.enterprise_id !== found.enterprise_id.toString()) throw { err: true, message: 'unauthorized' }


            const update = await this.CustomerModule.updateOne({ _id: id }, { $set: { estado: 'D' } });
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
            return {nombre:decodedToken.nombre,
                email:decodedToken.email
            }
        } catch (error) {
            return new HttpException('Ocurrio un error ' + error.message || error, HttpStatus.NOT_FOUND)
        }

    }

}
