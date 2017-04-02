import { UsingObservable } from 'rxjs/observable/UsingObservable';
import { DetailsPage } from '../details/details';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MovieObject, MovieProvider } from '../../providers/movies';

/*
  Generated class for the Favorite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html'
})
export class FavoritePage {

  public favorites: Array<MovieObject>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieProvider: MovieProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }
  ngOnInit() {
    this.favorites = this.movieProvider.getFavorites();
  }
  openMovie(movieId: String) {
    this.navCtrl.push(DetailsPage, { "movieId": movieId })
  }
}
