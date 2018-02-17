import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';
import { EliteApi } from '../../providers/providers';
import { GamePage } from '../pages'

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  allGames: any[];
  dateFilter: string;
  games: any[];
  team: any;
  teamStanding: any;
  private tournamentData: any;
  useDateFilter = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    this.tournamentData = this.eliteApi.getCurrentTournament();

    // use lodash.chain to enable chain sequences
    this.games = _.chain(this.tournamentData.games)
                  // filter out game data related to the current team
                  .filter(game => game.team1Id === this.team.id || game.team2Id === this.team.id)
                  // map each game into an object
                  .map((game) => this.getGameObj(game))
                  .value();

    this.allGames = this.games;
    this.teamStanding = _.find(this.tournamentData.standings, { 'teamId': this.team.id });
  }

  getGameObj(game) {
    const isTeam1 = (game.team1Id === this.team.id);
    const opponentName = isTeam1 ? game.team2 : game.team1;
    const scoreDisplay = this.getScoreDisplay(isTeam1, game.team1Score, game.team2Score);

    return {
      gameId: game.id,
      opponent: opponentName,
      time: Date.parse(game.time),
      location: game.location,
      locationUrl: game.locationUrl,
      scoreDisplay: scoreDisplay,
      homeAway: (isTeam1 ? "vs." : 'at')
    };
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team1Score) {
      const teamScore = (isTeam1 ? team1Score : team2Score);
      const opponentScore = (isTeam1 ? team2Score : team1Score);
      const winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
      return winIndicator + teamScore + ' - ' + opponentScore;
    } else {
      return '';
    }
  }

  gameClicked($event, gameSelected) {
    // find the game that matched the game id
    const sourceGame = this.tournamentData.games.find(game => game.id === gameSelected.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, (game) => {
        return moment(game.time).isSame(this.dateFilter, 'day');
      });
    } else {
      this.games = this.allGames;
    }
  }

}
