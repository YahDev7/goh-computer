import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Enterprise, EnterpriseSchema } from './schema/schema.enterprise';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:Enterprise.name,
      schema:EnterpriseSchema,
    }
  ])/* TypeOrmModule.forFeature([Enterprises]) */],
  providers: [EnterpriseService],
  controllers: [EnterpriseController],
  exports:[EnterpriseService]
})
export class EnterpriseModule {}
