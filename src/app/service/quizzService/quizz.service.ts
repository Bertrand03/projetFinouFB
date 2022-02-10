import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Quizz} from "../../models/quizz.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  urlQuizz = 'http://localhost:5366/quizzs';


  constructor(private httpClient: HttpClient) { }

  // GET
  getQuizzWord(wordId) {
    return this.httpClient.get(this.urlQuizz + '/wordId/' + wordId);
  }


  // PUT
  updateQuizzWord(quizz: Quizz): Observable<Quizz> {
    const url = `${this.urlQuizz}/update/${quizz.animauxId}`;
    return this.httpClient.put<Quizz>(url, quizz, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  // RESET AIDE
  resetHelpWords() {

  }

}
