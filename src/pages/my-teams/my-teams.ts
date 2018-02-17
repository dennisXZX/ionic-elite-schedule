import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { TournamentsPage, TeamHomePage } from '../pages';
import { EliteApi, UserSettings } from '../../providers/providers';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favorites = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userSetting: UserSettings,
    private eliteApi: EliteApi) {
  }

  goToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  favTapped($event, favorite) {
    const loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });

    loader.present();

    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe((tournament) => {
        this.navCtrl.push(TeamHomePage, favorite.team);
      });
  }

  ionViewDidEnter() {
    this.userSetting.getAllFavorites().then((favorites => {
      this.favorites = favorites;
    }));
  }

}
