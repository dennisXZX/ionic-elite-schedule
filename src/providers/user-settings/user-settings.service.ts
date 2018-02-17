import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserSettings {

  constructor(
    public http: HttpClient,
    private storage: Storage) {
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    const item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };

    this.storage.set(String(team.id), JSON.stringify(item));
  }

  unfavoriteTeam(team) {
    this.storage.remove(String(team.id));
  }

  isFavoriteTeam(teamId) {
    return this.storage.get(String(teamId)).then(
      (value) => value ? true : false
    );
  }

  getAllFavorites() {
    return new Promise<any[]>(resolve => {
      let results = [];

      this.storage.forEach(data => {
        results.push(JSON.parse(data));
      });

      resolve(results);
    });
  }

}
