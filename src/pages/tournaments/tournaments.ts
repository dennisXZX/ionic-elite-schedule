import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamsPage } from '../pages';
import { EliteApi } from '../../providers/providers';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) {
  }

  itemTapped($event, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }

  ionViewDidLoad() {
    // fetch the tournaments data
    this.eliteApi.getTournaments().then(data => {
      this.tournaments = data;
    });
  }

}
