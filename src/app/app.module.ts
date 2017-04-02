import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SearchPage } from '../pages/search/search';
import { DetailsPage } from '../pages/details/details';
import { FavoritePage } from '../pages/favorite/favorite';
import { MovieProvider } from '../providers/movies'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    DetailsPage,FavoritePage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{mode:"ios"})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    DetailsPage,FavoritePage
  ],
  providers: [
    MovieProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
