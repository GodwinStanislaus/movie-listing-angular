import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  // movies passed from Parent Component //
  @Input() movie: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  /**
   * for the give list of genre - Ids,
   * return list of genre descriptions
   * @param genreIds -
   */
  getGenres(genreIds: []): string[] {
    return genreIds.map(id => this.movieService.genre.get(id));
  }

  // Display a list of movies, each showing their title, genres and poster image.
}
