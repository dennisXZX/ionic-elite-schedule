import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {

  private baseUrl = 'https://ionic-elite-schedule-7a891.firebaseio.com/';
  currentTournament: any = {};
  private tournamentData = {};

  constructor(public http: HttpClient) {
  }

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res));
    });
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
    if (!forceRefresh && this.tournamentData[tourneyId]) {
      this.currentTournament = this.tournamentData[tourneyId];
      // console.log('** no need to make HTTP call, just return the data');
      return Observable.of(this.currentTournament);
    }

    // don't have data yet, make HTTP call
    // console.log('** about to make HTTP call');
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .map(response => {
        this.tournamentData[tourneyId] = response;
        this.currentTournament = this.tournamentData[tourneyId];
        return this.currentTournament;
      });
  }

  getCurrentTournament() {
    return this.currentTournament;
  }

  refreshCurrentTournament(){
    return this.getTournamentData(this.currentTournament.tournament.id, true);
  }

}
