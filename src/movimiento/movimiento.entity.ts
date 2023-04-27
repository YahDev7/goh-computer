import { Caja } from "src/caja/caja.entity";
import { Enterprises } from "src/enterprise/enterprise.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinColumn } from "typeorm"
@Entity({name:'movimiento'})/* permite convertir esta clase en una tabla y el nombre de la tabla */
export class Movimiento {
   
    @PrimaryGeneratedColumn() //primary key y autoincrement
    id:number; /* Columnas */

    @Column({nullable:false}) //unico
    documento_id:number;
    
    @Column({nullable:false}) //unico
    enterprise_id:number;

    @Column() //unico
    user_id:number;

    @Column() //unico
    customer_id:number;

    @Column() //unico
    caja_id:number;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'}) //tipo fecha y agregale la fecha actual
    fecha:Date;
    
    @Column({length:10}) //unico
    tipo:string
    
    @Column({nullable:false})//opcional
    forma_pago:string;
    
    @Column({length:100,nullable:false}) //unico
    nro_operacion:string  

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) //unico
    pago_con:number  

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) //unico
    monto_pagar:number  

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) //unico
    vuelto:number 

    @Column({length:40}) //unico
    observacion:string  

    @Column({length:10,nullable:false}) //unico
    tipo_compra_venta:string;

    @Column({length:2,nullable:false}) //tipo fecha y agregale la fecha actual
    estado:string;

   @ManyToOne(()=>Enterprises,enterprise=>enterprise.movimiento)
    enterprise:Enterprises

    @ManyToOne(()=>Caja,caja=>caja.mov)
    caja:Caja
}
