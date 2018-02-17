import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/providers';
import { TeamHomePage } from '../team-home/team-home';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteApi: EliteApi) {
    this.game = this.navParams.data;
  }

  teamTapped(teamId) {
    const tournamentData = this.eliteApi.getCurrentTournament();
    const team = tournamentData.teams.find(team => team.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }
}
