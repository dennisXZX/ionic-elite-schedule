import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { EliteApi } from '../../providers/providers';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private eliteApi: EliteApi) {
  }

  itemTapped($event, team) {
    // passing the team object to TeamDetailPage as a parameter
    this.navCtrl.push(TeamHomePage, team);
  }

  ionViewDidLoad() {
    const selectedTournament = this.navParams.data;

    const loader = this.loadingCtrl.create({
      content: 'Getting tournaments',
      spinner: 'circles'
    });

    loader.present().then(() => {
      // fetch the teams data based on the tournament id
      this.eliteApi.getTournamentData(selectedTournament.id)
        .subscribe(currentTournament => {
          this.teams = currentTournament.teams;
          loader.dismiss();
        });
    });
  }

}
