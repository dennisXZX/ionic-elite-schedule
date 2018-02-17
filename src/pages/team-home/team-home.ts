import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StandingsPage, TeamDetailPage } from '../pages';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    // use the navParams service to catch the parameter passed from navigation
    this.team = this.navParams.data;
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}
