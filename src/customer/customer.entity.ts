import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm"
import { Enterprises } from "src/enterprise/enterprise.entity";
import { User } from "src/user/user.entity";

/* import { Exclude } from 'class-transformer';
import { Movimientos } from "src/movimientos/movimientos.entity"; */

@Entity({name:'customer'})/* permite convertir esta clase en una tabla y el nombre de la tabla */
export class Customer {
   
    @PrimaryGeneratedColumn() //primary key y autoincrement
    id:number; /* Columnas */

    @Column({nullable:false}) //unico
    enterprise_id:number;

    @Column({nullable:false}) //unico
    user_id:number;
    
    @Column({unique:true,length:8}) //unico
    dni:string
    
    @Column({nullable:false})//opcional
    nombres:string;

    @Column({length:20,nullable:false}) //unico
    ap_paterno:string;

    @Column({length:20,nullable:false}) //unico
    ap_materno:string;
    
    @Column({length:10}) //unico
    telefono:string  

    @Column({length:20}) //unico
    departamento:string  

    @Column({length:20}) //unico
    provincia:string  

    @Column({length:20}) //unico
    distrito:string  

    @Column({length:40}) //unico
    direccion:string  

    @Column({length:20,nullable:false}) //unico
    email:string;

 //   @Exclude()
    @Column({ length: 20,nullable:false })//opcional
    pass:string;

    @Column({length:2}) //tipo fecha y agregale la fecha actual
    estado:string;

   @ManyToOne(()=>Enterprises,enterprise=>enterprise.customer)
    enterprise:Enterprises

    @ManyToOne(()=>User,user=>user.customer)
    user:User
 
}
