import { Enterprises } from "src/enterprise/enterprise.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm"

@Entity({name:'compesp'})/* permite convertir esta clase en una tabla y el nombre de la tabla */
export class Compesp {
   
    @PrimaryGeneratedColumn() //primary key y autoincrement
    id:number; /* Columnas */

    @Column({nullable:false}) //unico
    enterprise_id:number;
    
    @Column({type:'int',nullable:false}) //unico
    id_espec:number;
    
    @Column({nullable:false}) //unico
    componente_id:number;

    @Column({nullable:false}) //unico
    nombre:string;

    @ManyToOne(()=>Enterprises,enterprise=>enterprise.compes)
    enterprise:Enterprises
/*  ENTERPRISE
   @ManyToOne(()=>Enterprises,enterprise=>enterprise.customer_id)
    enterprise:Enterprises
 */
}
