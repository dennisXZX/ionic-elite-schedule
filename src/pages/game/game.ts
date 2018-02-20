import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/providers';
import { MapPage, TeamHomePage } from '../pages';

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
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId) {
    const tournamentData = this.eliteApi.getCurrentTournament();
    const team = tournamentData.teams.find(team => team.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirections(){
    let tourneyData = this.eliteApi.getCurrentTournament();
    let location = tourneyData.locations[this.game.locationId];
    // window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap(){
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2);
  }
}
