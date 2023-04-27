import { Categoria } from "src/categoria/categoria.entity";
import { Enterprises } from "src/enterprise/enterprise.entity";
import { User } from "src/user/user.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"

@Entity({name:'subcategoria'})/* permite convertir esta clase en una tabla y el nombre de la tabla */
export class SubCategoria {
   
    @PrimaryGeneratedColumn() //primary key y autoincrement
    id:number; /* Columnas */

    @Column({nullable:false}) //unico
    usuario_id:number;

    @Column({nullable:false}) //unico
    enterprise_id:number;

    @Column({nullable:false}) //unico
    categoria_id:number;

    @Column({length:100,nullable:false}) //unico
    nombre:string;

    @Column({length:70,nullable:false}) //unico
    imagen:string;

    @Column({length:500}) //unico
    url_imagen:string;

    @Column({length:10})
    estado:string;

    @ManyToOne(()=>Enterprises,enterprise=>enterprise.subcat)
    enterprise:Enterprises

    @ManyToOne(()=>User,enterprise=>enterprise.subcat)
    user:User

    @ManyToOne(()=>Categoria,cat=>cat.subcat)
    cat:Categoria
}


