import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams = [
    { id: 1, name: 'EC Elite 1' },
    { id: 2, name: 'EC Elite 2' },
    { id: 3, name: 'EC Elite 3' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  itemTapped($event, team) {
    // passing the team object to TeamDetailPage as a parameter
    this.navCtrl.push(TeamHomePage, team);
  }

}
