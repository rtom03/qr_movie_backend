import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { QrCodeService } from './qrcode.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, QrCodeService],
})
export class MoviesModule {}
