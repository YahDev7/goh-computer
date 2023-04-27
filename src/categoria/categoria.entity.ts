import { Enterprises } from "src/enterprise/enterprise.entity";
import { SubCategoria } from "src/subcategoria/subcategoria.entity";
import { User } from "src/user/user.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"

@Entity({name:'categoria'})/* permite convertir esta clase en una tabla y el nombre de la tabla */
export class Categoria {
   
    @PrimaryGeneratedColumn() //primary key y autoincrement
    id:number; /* Columnas */

    @Column({nullable:false}) //unico
    usuario_id:number;

    @Column({nullable:false}) //unico
    enterprise_id:number;
  
    @Column({length:100,nullable:false}) //unico
    nombre:string;

    @Column({length:70,nullable:false}) //unico
    imagen:string;

    @Column({length:500}) //unico
    url_imagen:string;

    @Column({length:10})
    estado:string;

    @ManyToOne(()=>Enterprises,enterprise=>enterprise.categoria)
    enterprise:Enterprises

    @ManyToOne(()=>User,enterprise=>enterprise.cat)
    user:User

    @OneToMany(()=>SubCategoria,enterprise=>enterprise.cat)
    subcat:SubCategoria[]
/*  USUARIO
  @OneToMany(()=>Users,user=>user.enterprise_id) //esto viene de post.entity
    user_id:Users[];*/
}


