import { Enterprises } from "src/enterprise/enterprise.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm"

@Entity({name:'especificaciones'})/* permite convertir esta clase en una tabla y el nombre de la tabla */
export class Especificaciones {
   
    @PrimaryGeneratedColumn() //primary key y autoincrement
    id:string  

    @Column({nullable:false}) //unico
    enterprise_id:number;
    
    @Column({length:10,nullable:false}) //tipo fecha y agregale la fecha actual
    title:string;

    @ManyToOne(()=>Enterprises,enterprise=>enterprise.especifi)
    enterprise:Enterprises
/*  ENTERPRISE
   @ManyToOne(()=>Enterprises,enterprise=>enterprise.customer_id)
    enterprise:Enterprises
 */
}
