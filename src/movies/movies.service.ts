import { Injectable } from '@nestjs/common';
import { MOVIESDATA } from './movies.data';
import { v4 as uuidv4 } from 'uuid';

export interface Movie {
  Title: string;
  Year: string;
  Images: string[];
  Released?: string;
  Genre?: string;
  Director?: string;
  // Add any other fields present in your data
}

@Injectable()
export class MoviesService {
  private storage = new Map<string, Movie[]>(); // UUID -> 10 random movies

  getRandomMovies(): Movie[] {
    const shuffled = [...MOVIESDATA].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }

  generateNewSet(): { id: string; movies: Movie[] } {
    const id = uuidv4();
    const movies = this.getRandomMovies();
    this.storage.set(id, movies);
    return { id, movies };
  }

  getMoviesById(id: string): Movie[] | undefined {
    return this.storage.get(id);
  }
}
