import { Body, Controller, Get, Query } from '@nestjs/common';
import { QrService } from './qr.service';

@Controller('qr')
export class QrController {
    constructor(private readonly qrCodeService: QrService) {}

  @Get()
  async generateQrCode(@Body() data) {
    const {content}=data
    console.log(content)
    const qrCodeDataURL = await this.qrCodeService.generateQrCode(content);
    return `<img src="${qrCodeDataURL}" alt="QR Code" />`;
  }
}
