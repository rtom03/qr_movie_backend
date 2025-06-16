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
    }, 10_000); // for 10 seconds
  }

  private async generateNewQr() {
    const { id } = await this.moviesService.generateNewSet();
    this.latestId = id;
    const productionUrl = `https://qr-movie-frontend.vercel.app/movies/view/${id}`;
    const developmentUrl = `http://localhost:8000/movies/view/${id}`;
    const url = productionUrl || developmentUrl;
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
