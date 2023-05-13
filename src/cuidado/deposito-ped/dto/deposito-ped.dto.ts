/* import { IsNumber, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class DepositoPedDto {
  @IsString()
  @IsNotEmpty()
  id_pedido: ObjectId;

  @IsNumber()
  @IsNotEmpty()
  enterprise_id: number;

  @IsString()
  @IsNotEmpty()
  nro_operacion: string;

  @IsString()
  @IsNotEmpty()
  metodo_pago:string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  monto_deposito: number;

  @IsEnum(['pendiente', 'confirmado', 'rechazado','anulado'])
  @IsNotEmpty()
  estado: 'pendiente' | 'confirmado' | 'rechazado'|'anulado';

  @Transform(({ value }) => new Date(value))
  fecha_deposito: Date;
}
 */