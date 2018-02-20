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
  queryText: string;

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

  updateTeams(){
    const queryTextLower = this.queryText.toLowerCase();
    const filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      const teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
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
