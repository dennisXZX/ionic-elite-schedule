import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import {
  GamePage,
  MyTeamsPage,
  TeamDetailPage,
  TeamsPage,
  TeamHomePage,
  TournamentsPage,
  StandingsPage
} from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EliteApi } from '../providers/providers';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TeamHomePage,
    TournamentsPage,
    StandingsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TeamHomePage,
    TournamentsPage,
    StandingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EliteApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
