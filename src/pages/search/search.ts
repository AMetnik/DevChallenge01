import { LoadingController } from 'ionic-angular/es2015/components/loading/loading';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movies'
/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public searchParam: String = "";
  private searchRequest: any = null;
  public movies: Array<any> = null;
  public loading = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public movieProvider: MovieProvider) { }

  getMovies() {
    if (this.searchParam.length > 2) {
      this.loading = true;
      if (this.searchRequest !== null) {
        this.searchRequest.unsubscribe();
        this.searchRequest = null;
      }
      this.searchRequest = this.movieProvider.getMovies(this.searchParam).subscribe(data => {
        if (data && data.Response && data.Response === "True" && data.totalResults && data.totalResults > 1) {
          this.movies = data.Search;
        } else if (data.totalResults === 1) {
          //maybe confirm if user would want to see details for the movie, since only 1 hit..?
        } else {
          this.movies = [];//no results
        }
        this.loading = false;
        this.searchRequest.unsubscribe();
        this.searchRequest = null;
      }, failure => {
        this.movies = [];
      });
    }
  }
  openMovie(movieId: String) {
    this.navCtrl.push(DetailsPage, { "movieId": movieId })
  }
}
