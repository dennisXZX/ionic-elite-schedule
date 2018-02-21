import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api.service';
declare let window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) {
    // get the data from navigation parameter
    const games = this.navParams.data;
    const tournamentData = this.eliteApi.getCurrentTournament();
    const location = tournamentData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
    };
  }

  getDirections(){
    window.location = `geo:${this.map.lat},${this.map.lng};u=35;`;
  }

}
