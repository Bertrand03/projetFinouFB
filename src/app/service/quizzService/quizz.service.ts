import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Quizz} from "../../models/quizz.model";
import {Observable} from "rxjs";
import {HistoQuizzObs} from "../../models/histoQuizzObs.model";

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  urlQuizz = 'http://localhost:5366/quizzs';
  urlHistoQuizz = 'http://localhost:5366/histoquizzs';


  constructor(private httpClient: HttpClient) { }

  // GET
  getQuizzWord(wordId) {
    return this.httpClient.get(this.urlQuizz + '/wordId/' + wordId);
  }

  getWordsByName(name) {
    return this.httpClient.get(this.urlQuizz + '/name/' + name);
  }

  getAllTriesNumberByCategoryId(categoryId) {
    return this.httpClient.get(this.urlQuizz + '/triesByCategoryId/' + categoryId );
  }

  getAllWordsWithTries() {
    console.log('passe dans getAllWordsWithTries');
    return this.httpClient.get(this.urlQuizz + '/wordsError');
  }

  getAllDatas(playerSelected, categoryQuizzSelected) {
    console.log('passe dans getAllQuizzData');
    return this.httpClient.get(this.urlQuizz + '/allQuizzData/' + playerSelected + '/' + categoryQuizzSelected);
  }

  getLastGame() {
    console.log('passe dans getLastGame');
    return this.httpClient.get(this.urlQuizz + '/histoQuizz/lastGame');
  }

  // PUT
  updateQuizzWord(quizz: Quizz): Observable<Quizz> {
    console.log('passe dans updateQuizzWord');
    const url = `${this.urlQuizz}/update/${quizz.animauxId}`;
    return this.httpClient.put<Quizz>(url, quizz, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  // POST
  addNewWord(quizzWord: Quizz): Observable<Quizz> {
    return this.httpClient.post<Quizz>(this.urlQuizz + '/addWord', quizzWord, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  // v2
  savePlayerQuizzV2(hq: any): Observable<HistoQuizzObs> {
    console.log('Dans savePlayerQuizzV2() hq vaut : ');
    console.log(hq);
    return this.httpClient.post<HistoQuizzObs>(this.urlQuizz + '/saveQuizz',
      hq,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      });
  }

  saveHistoQuizz(quizzName) {
    console.log('Dans saveHistoQuizz() quizzName vaut : ');
    console.log(quizzName);
    return this.httpClient.post(this.urlHistoQuizz + '/' + quizzName
      ,{
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      });
  }

  // DELETE
  deleteQuizzWord(quizz: Quizz) {
      console.log('url vaut : ' + 'http://localhost:5366/quizzs/delete/' + quizz.animauxId);
      return this.httpClient.delete(this.urlQuizz + '/delete/' + quizz.animauxId);
    }

  // DESERIALIZE
  deserialize(nameFileToDeserialize, joueurId) {
    return this.httpClient.get(this.urlQuizz + '/deserialize/' + nameFileToDeserialize+ '/' + joueurId);
  }

  deserializeHistoQuizz(nameFileToDeserialize, joueurId) {
    return this.httpClient.get(this.urlQuizz + '/deserializeHistoQuizz/' + nameFileToDeserialize + '/' + joueurId);
  }

  deserializeHistoQuizzByHistoQuizzId(histoQuizzId) {
    return this.httpClient.get(this.urlQuizz + '/deserializeHistoQuizz/' + histoQuizzId);
  }
}
