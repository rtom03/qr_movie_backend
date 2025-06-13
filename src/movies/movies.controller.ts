import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService, Movie } from './movies.service';
import { QrCodeService } from './qrcode.service';

@Controller('movies')
export class MoviesController {
  private latestId: string;
  private latestQr: string;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly qrCodeService: QrCodeService,
  ) {
    this.generateNewQr(); // Generate first one immediately

    setInterval(() => {
      this.generateNewQr();
    }, 10_000); // 10 seconds
  }

  private async generateNewQr() {
    const { id } = this.moviesService.generateNewSet();
    this.latestId = id;
    const deployUrl = `https://qr-movie-backend.onrender.com/${id}`;
    const url = deployUrl || `http://localhost:3000/movies/view/${id}`;
    this.latestQr = await this.qrCodeService.generateQrCode(url);
  }

  @Get('qr')
  getLatestQr() {
    return {
      qr: this.latestQr,
      id: this.latestId,
    };
  }

  @Get('view/:id')
  getMovies(@Param('id') id: string): { movies: Movie[] } | { error: string } {
    const movies = this.moviesService.getMoviesById(id);
    if (!movies) {
      return { error: 'Invalid ID' };
    }
    return { movies };
  }
}
