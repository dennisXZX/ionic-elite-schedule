import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { EliteApi } from '../../providers/providers';
import * as _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  private allTeams: any;
  private allTeamDivisions: any;
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

  logger(data) {
    console.log(data);
    return data;
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
          this.allTeams = currentTournament.teams;

          console.log('all teams', this.allTeams);
          this.allTeamDivisions =
            _.chain(currentTournament.teams)
             .groupBy('division')
             .toPairs()
             .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
             .value();

          this.teams = this.allTeamDivisions;

          loader.dismiss();
        });
    });
  }

}
