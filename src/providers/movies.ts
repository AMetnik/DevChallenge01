import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MovieProvider {
  private favorites: Array<MovieObject> = [];

  constructor(public http: Http) {
    this.favorites = this.getFavoritesFromStorage();
  }

  public getMovies(query: String): Observable<any> {
    return this.http.get('http://www.omdbapi.com/?s=' + query).map((res) => res.json());
  }

  public getMovie(id: any): Observable<any> {
    return this.http.get('http://www.omdbapi.com/?i=' + id).map((res) => res.json());
  }

  public addToFavorites(movie: MovieObject) {
    if (!this.favorites) {
      this.favorites = [];
    }
    let isAlreadyFavorite = false;
    if (this.favorites && this.favorites.length && this.favorites.length > 0) {
      for (let favMovie of this.favorites) {
        if (movie.imdbID === favMovie.imdbID) {
          isAlreadyFavorite = true;
        }
      }
    }
    if (!isAlreadyFavorite) {
      this.favorites.push(movie);
      this.saveFavoritesInStorage();
    }
  }
  public removeFromFavorites(movie: MovieObject) {
    //TODO remove 
    this.saveFavoritesInStorage();
  }

  public isMovieInFavorites(movie): boolean {
    var defaultRetVal = false;
    if (this.favorites && this.favorites.length && this.favorites.length > 0)
      for (let favMovie of this.favorites) {
        if (movie.imdbID === favMovie.imdbID) {
          defaultRetVal = true;
        }
      }
    return defaultRetVal;
  }
  public getFavorites(): Array<MovieObject> {
    return this.favorites;
  }

  private saveFavoritesInStorage() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  private getFavoritesFromStorage(): Array<MovieObject> {
    let returnVal = [];
    //retrieve
    let stringArray = localStorage.getItem("favorites");
    returnVal = JSON.parse(stringArray);
    return returnVal;
  }
}

export class MovieObject {
  constructor(data: any) {
    if (typeof data !== 'undefined' && data !== null) {
      this.title = data.Title;
      this.imdbID = data.imdbID;
      this.year = data.Year;
      this.rated = data.Rated;
      this.released = data.Released;
      this.runtime = data.Runtime;
      this.genre = data.Genre;
      this.director = data.Director;
      this.writer = data.Writer;
      this.actors = data.Actors;
      this.plot = data.Plot;
      this.language = data.Language;
      this.country = data.Country;
      this.awards = data.Awards;
      this.poster = data.Poster;
      this.type = data.Type;
      this.dvd = data.DVD;
      this.boxOffice = data.BoxOffice;
      this.production = data.Production;
      this.website = data.Website;
    }
  }
  public imdbID: String;
  public title: String;
  public year: String;
  public rated: String;
  public released: String;
  public runtime: String;
  public genre: String;
  public director: String;
  public writer: String;
  public actors: String;
  public plot: String;
  public language: String;
  public country: String;
  public awards: String;
  public poster: String;
  public type: String;
  public dvd: String;
  public boxOffice: String;
  public production: String;
  public website: String;

}