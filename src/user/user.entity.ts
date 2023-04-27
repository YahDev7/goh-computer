import { Caja } from "src/caja/caja.entity";
import { Categoria } from "src/categoria/categoria.entity";
import { Customer } from "src/customer/customer.entity";
import { Enterprises } from "src/enterprise/enterprise.entity";
import { SubCategoria } from "src/subcategoria/subcategoria.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm"

@Entity({name:'user'})/* permite convertir esta clase en una tabla y el nombre de la tabla */
export class User {
   
    @PrimaryGeneratedColumn() //primary key y autoincrement
    id:number; /* Columnas */

    @Column({nullable:false}) //unico
    enterprise_id:number;

    @Column({length:100,nullable:false}) //unico
    nombre:string;

    @Column({length:20,nullable:false}) //unico
    ap_paterno:string;

    @Column({length:20,nullable:false}) //unico
    ap_materno:string;

    @Column({unique:true,length:8,nullable:false}) //unico
    dni:string

    @Column({unique:true,length:20,nullable:false}) //unico
    email:string

    @Column({length:20,nullable:false}) //unico
    password:string
    
    @Column({length:10,nullable:false}) //unico
    rol:string 

    @Column({length:10,nullable:false}) //unico
    telefono:string    

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'}) //tipo fecha y agregale la fecha actual
    fecha_creacion:Date;

    @Column({length:10})
    estado:string;

    @ManyToOne(()=>Enterprises,enterprise=>enterprise.user)
    enterprise:Enterprises

    @OneToMany(()=>Customer,customer=>customer.user)
    customer:Customer[]

    @OneToOne(()=>Caja)
    @JoinColumn()
    caja:Caja

    @OneToMany(()=>Categoria,cat=>cat.user)
    cat:Categoria[]

    @OneToMany(()=>SubCategoria,subcat=>subcat.user)
    subcat:SubCategoria[]
 
}


