import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprises } from './enterprise.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Enterprises])],
  providers: [EnterpriseService],
  controllers: [EnterpriseController],
  exports:[EnterpriseService]
})
export class EnterpriseModule {}
