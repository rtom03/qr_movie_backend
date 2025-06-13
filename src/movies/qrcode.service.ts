import { Injectable } from '@nestjs/common';
// import QRCode from 'qrcode';
import * as QRCode from 'qrcode';

@Injectable()
export class QrCodeService {
  async generateQrCode(url: string): Promise<string> {
    return await QRCode.toDataURL(url);
  }
}
