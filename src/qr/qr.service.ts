import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';


@Injectable()
export class QrService {
    async generateQrCode(data: string) {
        try {
          const qrCodeDataURL = await qrcode.toDataURL(data);
          return qrCodeDataURL;
        } catch (error) {
          throw new Error('Failed to generate QR code.');
        }
      }
}
