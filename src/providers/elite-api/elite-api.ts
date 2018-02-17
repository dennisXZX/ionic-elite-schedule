import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {

  private baseUrl = 'https://ionic-elite-schedule-7a891.firebaseio.com/';
  currentTournament: any = {};

  constructor(public http: HttpClient) {
  }

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res));
    });
  }

  getTournamentData(tournamentId): Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
      .map((response) => {
        this.currentTournament = response;
        return this.currentTournament;
      })
  }

}
