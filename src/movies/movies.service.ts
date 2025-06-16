import { Injectable } from '@nestjs/common';
import { MOVIESDATA } from './data';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
  Images: string[];
}

@Injectable()
export class MoviesService {
  private storage = new Map<string, Movie[]>();

  constructor(private readonly moviesData: DatabaseService) {}

  async getRandomMovies(): Promise<Movie[]> {
    const dbMovies = await this.moviesData.movies.findMany();

    const shuffled =
      dbMovies.sort(() => 0.5 - Math.random()) ||
      [...MOVIESDATA].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }

  async generateNewSet(): Promise<{ id: string; movies: Movie[] }> {
    const id = uuidv4();
    const movies = await this.getRandomMovies();
    this.storage.set(id, movies);
    return { id, movies };
  }

  getMoviesById(id: string): Movie[] | undefined {
    return this.storage.get(id);
  }
}
