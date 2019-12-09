import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/model/movie';
import { Genre } from 'src/app/model/genre';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  // list of movies from API call //
  movies: Movie[] = [];
  // filtered list of movies
  filteredMovies: Movie[] = [];
  // Genres from API call //
  genres = new Map();
  // list of Genre user selected //
  selectedGenres = [];

  // Rating Configuration //
  min = 0;
  max = 10;
  ratingValue = 3;
  increment = 0.5;
  ticks = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
  tickLabels = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    // Get the list of Genres
    this.movieService.getGenres().subscribe(
      res => {
        this.genres = res;
      }, error => {
        // TODO: Handle error - Display in UI //
        console.log(error);
      }
    );
    // Get the list of Movies and Sort by Popularity
    // Most popular movie is first in the list
    this.movieService.getMovies().subscribe(
      movies => {
        this.movies = movies;
        this.filteredMovies = Array.from(movies).sort((a, b) => (a.popularity < b.popularity) ? 1 : -1);
      }, error => {
        // TODO: Handle error - Display in UI //
        console.log(' Error while retrieving Movie', error);
      }
    );
  }

  /**
   * first filter the movies by Genres then by movies' rating.
   */
  filterMovies() {
    this.filteredMovies = this.movies.filter(movies => {
      return this.selectedGenres.every(gid => {
        return movies.genre_ids.includes(gid);
      });
    }).filter(movie => {
      return movie.vote_average >= this.ratingValue;
    });
  }

  /* Triggered when slider's is moved and it' value changes */
  filterMoviesByRating(e) {
    console.log(e);
    this.ratingValue = e.newValue;
    this.filterMovies();
  }

  filteMoviesByGenre(genre, target) {
    // maintain a list of selected Genre //
    if (target.checked) {
      this.selectedGenres.push(genre.key);
    } else {
      this.selectedGenres.splice(this.selectedGenres.indexOf(genre.key), 1);
    }
    this.filterMovies();
  }

  // Display a list of movies, each showing their title, genres and poster image.

  // The movies should be ordered by popularity (most popular first - popularity property).

  // Movies should be filterable by multiple genres, the user should have the ability to toggle movies
  // depending on all of its assigned genres.
  // For example if 'Action' and 'Drama' genres are selected listed movies must have both 'Action' and 'Drama' genres.

  // Movies should also be filterable by their rating (vote_average property). i.e If rating was set to 5,
  // you would expect to see all movies with a rating of 5 or higher.

  // The input API's should only be called once.
}
