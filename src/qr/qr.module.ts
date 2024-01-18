import { Module } from '@nestjs/common';
import { QrController } from './qr.controller';
import { QrService } from './qr.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
 /*  imports:[MongooseModule.forFeature([
    {
      name:Enterprise.name,
      schema:EnterpriseSchema,
    }
  ])], */
  controllers: [QrController],
  providers: [QrService],
  exports:[QrService]

})
export class QrModule {}
