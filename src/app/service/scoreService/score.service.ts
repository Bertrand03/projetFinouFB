import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Score} from '../../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  public totalScoreByPlayer: number;
  private scoreByCategoryAndPlayer: number;
  urlScore = 'http://localhost:5366/score';

  constructor(private httpClient: HttpClient) { }

  // GET
  getTotalScoreByPlayerService(playerId) {
    return this.httpClient.get('http://localhost:5366/score/scoreTotal/' + playerId);
  }

  getScoreByCategoryAndPlayerService(categorieId, playerId) {
    console.log('PASSE dans getScoreByCategoryAndPlayerService, categorieId vaut : ' + categorieId + ' et playerId vaut : ' + playerId);
    return this.httpClient.get('http://localhost:5366/score/scoreByCategorieId/' + categorieId + '/' + playerId);
  }

  // PUT
  updateScoreByCategoryAndPlayer(score: Score): Observable<Score> {
    const url = `${this.urlScore}/updateScore/${score.joueurId}/${score.categorieId}`;
    console.log('DANS updateScoreByCategoryAndPlayer joueurId vaut : ' + score.joueurId + ' et categorieId vaut ' + score.categorieId);
    console.log('DANS updateScoreByCategoryAndPlayer score vaut : ');
    console.log(score);
    return this.httpClient.put<Score>(url, score, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }


  // GETTERS AND SETTERS
  getTotalScoreByPlayer(): number {
    return this.totalScoreByPlayer;
  }

  setTotalScoreByPlayer(value: number) {
    this.totalScoreByPlayer = value;
  }

  getScoreByCategoryAndPlayer(): number {
    return this.scoreByCategoryAndPlayer;
  }

  setScoreByCategoryAndPlayer(value: number) {
    this.scoreByCategoryAndPlayer = value;
  }
}
