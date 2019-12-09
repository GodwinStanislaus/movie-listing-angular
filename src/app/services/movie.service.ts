import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genre } from '../model/genre';
import { Movie } from '../model/movie';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_KEY = environment.api_key;
  private BASE_URL = environment.base_url;
  private MOVIE_URL = `${this.BASE_URL}/movie/now_playing?api_key=${this.API_KEY}&language=en-US&page=1`;
  private GENRES_URL = `${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}&language=en-US&page=1`;
  private IMAGE_URL = environment.image_url;
  private movies: Movie[];
  private genres: Map<number, string>;

  constructor(private http: HttpClient) {
    this.movies = [];
    this.genres = new Map();
  }

  get movieList(): Movie[] {
    return this.movies;
  }

  get genre(): Map<number, string> {
    return this.genres;
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get(this.MOVIE_URL)
      .pipe(
        map((res: any) => {
          const results = res.results;
          results.forEach((movie: Movie) => {
            movie.image = this.getImagePath(movie.poster_path);
          });
          this.movies = results;
          return results;
        })
      );
  }

  getGenres(): Observable<Map<number, string>> {
    if (this.genres.size > 0) {
      return of(this.genres);
    } else {
      return this.http.get(this.GENRES_URL)
        .pipe(
          map((item: any) => {
            const genreMap = new Map();
            const genres: Genre[] = item.genres;
            genres.map(i => {
              genreMap.set(i.id, i.name);
            });
            this.genres = genreMap;
            return genreMap;
          })
        );
    }
  }

  getImagePath(imgPath) {
    const SIZE = 'w500';
    return `${this.IMAGE_URL}/${SIZE}/${imgPath}`;
  }

}
