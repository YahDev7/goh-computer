import { Caja } from "src/caja/caja.entity";
import { Categoria } from "src/categoria/categoria.entity";
import { Compesp } from "src/compesp/compesp.entity";
import { Customer } from "src/customer/customer.entity";
import { Especificaciones } from "src/especificaciones/especificaciones.entity";
import { Movimiento } from "src/movimiento/movimiento.entity";
import { Provider } from "src/provider/provider.entity";
import { SubCategoria } from "src/subcategoria/subcategoria.entity";
import { User } from "src/user/user.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm"

@Entity({name:'enterprises'})/* permite convertir esta clase en una tabla y el nombre de la tabla */
export class Enterprises {
   
    @PrimaryGeneratedColumn() //primary key y autoincrement
    id:number; /* Columnas */
    
    @Column({length:20,unique:true,nullable:false}) //unico
    nombre:string;

    @Column({length:11,unique:true,nullable:false}) //unico
    ruc:string;

    @Column({length:20,nullable:false}) //unico
    pais:string;

    @Column({length:20}) //unico
    ciudad:string;

    @Column({length:9})
    telefono:string;

    @Column({length:20,unique:true,nullable:false})//opcional
    email:string;

    @Column({length:20,nullable:false}) //unico
    pass:string;

    @Column({ length: 2 ,nullable:false})
    estado:string;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'}) //tipo fecha y agregale la fecha actual
    fecha_creacion:Date;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'}) //tipo fecha y agregale la fecha actual
    fecha_actualizacion:Date;

    @OneToMany(()=>User,user=>user.enterprise) //esto viene de post.entity
    user:User[];

    @OneToMany(()=>Customer,customer=>customer.enterprise) //esto viene de post.entity
    customer:Customer[];

    @OneToMany(()=>Movimiento,movimiento=>movimiento.enterprise) //esto viene de post.entity
    //@JoinColumn({name:"enterprises_id"})
    movimiento:Movimiento[]; 

    @OneToMany(()=>SubCategoria,subcat=>subcat.enterprise) //esto viene de post.entity
    subcat:SubCategoria[];

    @OneToMany(()=>Categoria,cat=>cat.enterprise) //esto viene de post.entity
    categoria:Categoria[];
    
    @OneToMany(()=>Caja,caja=>caja.enterprise) //esto viene de post.entity
    caja:Caja[];

    @OneToMany(()=>Especificaciones,espe=>espe.enterprise) //esto viene de post.entity
    especifi:Especificaciones[];

    @OneToMany(()=>Compesp,compes=>compes.enterprise) //esto viene de post.entity
    compes:Compesp[];

    @OneToMany(()=>Provider,prov=>prov.enterprise) //esto viene de post.entity
    provider:Provider[];
    
}


