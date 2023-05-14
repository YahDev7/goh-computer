import { ObjectId } from "mongodb";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm"

@Entity({name:'provider'})/* permite convertir esta clase en una tabla y el nombre de la tabla */
export class Provider {
   
    @PrimaryGeneratedColumn() //primary key y autoincrement
    id:number; /* Columnas */

    @Column({nullable:false}) //unico
    enterprise_id:ObjectId;
    
    @Column({unique:true,length:8}) //unico
    dni_ruc:string
    
    @Column({nullable:false})//opcional
    razon_social:string;
    
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

    @Column({length:2}) //tipo fecha y agregale la fecha actual
    estado:string;

/*     @ManyToOne(()=>Enterprises,enterprise=>enterprise.provider)
    enterprise:Enterprises */
}
