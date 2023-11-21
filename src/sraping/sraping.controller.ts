import { Controller, Get } from '@nestjs/common';
import { SrapingService } from './sraping.service';

@Controller('sraping')
export class SrapingController {
    constructor(
        private ScrapperService:SrapingService
    ){}

    @Get()
    get(){
       return this.ScrapperService.getDate()
    }
}
