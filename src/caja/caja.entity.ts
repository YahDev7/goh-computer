import { Enterprises } from 'src/enterprise/enterprise.entity';
import { Movimiento } from 'src/movimiento/movimiento.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
/* import { Usuario } from './usuario.entity'; */

@Entity()
export class Caja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false}) //unico
  enterprise_id:number;

  @Column({ type: 'varchar', length: 20, default: 'ABIERTA' })
  tipo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_apertura: Date;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  monto_apertura: number;

  @Column({ type: 'timestamp' })
  fecha_cierre: Date;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  monto_cierre: number;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  monto_cierre_real: number;

  @Column({ type: 'varchar', length: 10 })
  estado: string;

  @ManyToOne(()=>Enterprises,enterprise=>enterprise.caja)
  enterprise:Enterprises

  @OneToMany(() => Movimiento,mov=>mov.caja)
  mov: Movimiento[];
}
