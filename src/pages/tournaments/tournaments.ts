import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
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
    private loadingCtrl: LoadingController,
    private eliteApi: EliteApi) {
  }

  itemTapped($event, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }

  ionViewDidLoad() {
    // create a loader
    const loader = this.loadingCtrl.create({
      content: 'Getting tournaments',
      spinner: 'circles'
    });

    loader.present().then(() => {
      // fetch the tournaments data
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        // once the data is fetched, dismiss the loader
        loader.dismiss();
      });
    });
  }

}
