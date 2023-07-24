import { Module } from '@nestjs/common';
import { MovimientoMService } from './movimiento-m.service';
import { MovimientoMController } from './movimiento-m.controller';

import { CustomerModule } from 'src/customer/customer.module';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovimientoM, MovimientoMSchema } from './schema/movimiento-m.schema';
import { DocumentoModule } from 'src/documento/documento.module';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:MovimientoM.name,
      schema:MovimientoMSchema,
    }
  ]),EnterpriseModule,CustomerModule,DocumentoModule],
  providers: [MovimientoMService],
  controllers: [MovimientoMController],
  exports:[MovimientoMService]

})
export class MovimientoMModule {}
