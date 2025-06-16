import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
// import { PrismaClient } from 'generated/prisma';

interface Movie {
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

const prisma: PrismaClient = new PrismaClient();

const rawData = fs.readFileSync('data.json', 'utf-8');
const movies = JSON.parse(rawData) as Movie[];

async function main() {
  for (const movie of movies) {
    await prisma.movies.create({
      data: {
        Title: movie.Title,
        Year: movie.Year,
        Rated: movie.Rated,
        Released: movie.Released,
        Runtime: movie.Runtime,
        Genre: movie.Genre,
        Director: movie.Director,
        Writer: movie.Writer,
        Actors: movie.Actors,
        Plot: movie.Plot,
        Language: movie.Language,
        Country: movie.Country,
        Awards: movie.Awards,
        Poster: movie.Poster,
        Metascore: movie.Metascore,
        imdbRating: movie.imdbRating,
        imdbVotes: movie.imdbVotes,
        imdbID: movie.imdbID,
        Type: movie.Type,
        Response: movie.Response,
        Images: movie.Images,
      },
    });
  }

  console.log('All movies imported successfully!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    prisma.$disconnect();
  });
