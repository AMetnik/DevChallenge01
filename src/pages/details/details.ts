import { MovieProvider, MovieObject } from '../../providers/movies';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/*
  Generated class for the Details page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  public movie: MovieObject = null;
  public isFavorite: boolean = false;
  constructor(public navParams: NavParams, public movieProvider: MovieProvider) { }


  ngOnInit() {
    let params = this.navParams.get("movieId");
    this.movieProvider.getMovie(params).subscribe((data) => {
      let movie = new MovieObject(data);
      this.movie = movie;
      this.isFavorite = this.movieProvider.isMovieInFavorites(movie);
    });
  }
  addToFavorites() {
    this.movieProvider.addToFavorites(this.movie);
    this.isFavorite = this.movieProvider.isMovieInFavorites(this.movie);
  }
}
