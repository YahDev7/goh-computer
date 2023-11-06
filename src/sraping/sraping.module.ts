import { Module } from '@nestjs/common';
import { SrapingService } from './sraping.service';
import { SrapingController } from './sraping.controller';

@Module({
  providers: [SrapingService],
  controllers: [SrapingController]
})
export class SrapingModule {}
