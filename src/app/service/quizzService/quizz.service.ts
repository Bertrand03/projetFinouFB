import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Quizz} from "../../models/quizz.model";
import {Observable} from "rxjs";
import {Joueur} from "../../models/joueur.model";

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

  getWordsByName(name) {
    return this.httpClient.get(this.urlQuizz + '/name/' + name);
  }

  getAllTriesNumberByCategoryId(categoryId) {
    return this.httpClient.get(this.urlQuizz + '/triesByCategoryId/' + categoryId );
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

  // DELETE
  deleteQuizzWord(quizz: Quizz) {
      console.log('url vaut : ' + 'http://localhost:5366/quizzs/delete/' + quizz.animauxId);
      return this.httpClient.delete('http://localhost:5366/quizzs/delete/' + quizz.animauxId);
    }
}
