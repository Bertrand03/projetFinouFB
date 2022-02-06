import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


export class Quizz {
  constructor(
    public animauxId: number,
    public categorieId: number,
    public motFrancais: string,
    public motAnglais: string,
    public motTrouve: string,
  ) {
  }
}

export class Joueur {
  constructor(
    public id: number,
    public pseudo: string,
    public motDePasse: string,
    public score: number,
  ) {
  }
}

export class CategorieQuizz {
  constructor(
    public categorieId: number,
    public nomCategorie: string,
  ) {
  }
}

export class Score {
  constructor(
    public scoreId: number,
    public joueurId: number,
    public categorieId: number,
    public scoreGlobal: number,
    public scoreCategorie: number,
    public nbTentatives: number,
  ) {
  }
}


@Injectable({
  providedIn: 'root'
})


export class HttpClientService {

  tableauFiltre: Observable<any>;
  contenuCategorieQuizz: Observable<any>;
  urlApi = 'http://localhost:5366/quizzs/';
  urlScore = 'http://localhost:5366/score';
  urlJoueurCategorie: string;


  constructor(
    private httpClient: HttpClient
  ) {
  }

  // *** METHODE GET ***//

  getJoueurs() {
    return this.httpClient.get('http://localhost:5366/joueurs/');
  }

  getEmployees() {
    console.log('passe dans getEmployees()');
    return this.httpClient.get(this.urlApi);
  }

  getScore() {
    console.log('passe dans getScore()');
    return this.httpClient.get('http://localhost:5366/score/');
  }

  // getScoreByCategorieIdAndJoueurId(categorieId, joueurId) {
  //   return this.httpClient.get('http://localhost:5366/score/scoreByCategorieId/' + categorieId + '/' + joueurId);
  // }

  getScoreParJoueurEtCategorieQuizz(joueurId, categorieId) {
    console.log('passe dans getScoreParJoueurEtCategorieQuizz()');
    this.urlJoueurCategorie = 'http://localhost:5366/score/' + joueurId + '/' + categorieId;
    console.log('this.urlJoueurCategorie vaut ' + this.urlJoueurCategorie);
    return this.httpClient.get(this.urlJoueurCategorie);
  }

  getAllCategorieQuizzService() {
    console.log('Front-end - getAllCategorieQuizzService()');
    return this.httpClient.get('http://localhost:5366/trouve-anglais/');
  }

  getContenuCategorieQuizz(categorieId) {
    console.log('Front-end - getContenuCategorieQuizz()');
    console.log('categorieId vaut : ' + categorieId);
    this.contenuCategorieQuizz = this.httpClient.get('http://localhost:5366/quizzs/categorie/' + categorieId);
    return this.contenuCategorieQuizz;
  }

  getIdBis(reponseChoix) {
    console.log('passe dans getIdBis, reponseChoix vaut : ' + reponseChoix);
  }

  getScoreTotalByJoueur(joueurId) {
    console.log('Front-end - getScoreTotalByJoueur()');
    console.log('joueurId vaut : ' + joueurId);
    return this.httpClient.get('http://localhost:5366/score/scoreTotal/' + joueurId);
  }

  // *** METHODE PUT ***//

  majScoreCategoryService(score: Score): Observable<Score> {

    const url = `${this.urlScore}/updateScore/${score.joueurId}/${score.categorieId}`;
    console.log('DANS majScoreCategoryService joueurId vaut : ' + score.joueurId + ' et categorieId vaut ' + score.categorieId);
    return this.httpClient.put<Score>(url, score, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  majAnimalBisService(quizz: Quizz): Observable<Quizz> {
    // console.log('passe dans majAnimalBisService');
    // console.log('animal mis à jour vaut :');
    // console.log(quizz);

    const url = `${this.urlApi}/update/${quizz.animauxId}`;
    // console.log('quizz.animauxId vaut : ', quizz.animauxId);
    // console.log('url : ');
    // console.log(url);
    return this.httpClient.put<Quizz>(url, quizz, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  changeMotTrouveByYes(motTrouveRechercheId: Quizz, x: Quizz): Observable<Quizz> {
    if (motTrouveRechercheId != null) {
      x.motTrouve = 'oui';
      console.log('x apres maj vaut : ');
      console.log(x);
      console.log('url vaut : ');
      console.log(this.urlApi + motTrouveRechercheId);
      // return this.httpClient.put<Quizz>('http://localhost:5366/quizzs/' + motTrouveRechercheId, x, {
      return this.httpClient.put<Quizz>(this.urlApi, x, {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      });
    }
  }

  // *** METHODE POST ***//

  addNickname(pseudoDuJoueur: Joueur): Observable<Joueur> {
    console.log('passe dans addNickName');
    return this.httpClient.post<Joueur>('http://localhost:5366/joueurs/', pseudoDuJoueur, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  validerAnimalBis(quizz: Quizz): Observable<Quizz> {
    console.log('passe dans ValiderAnimalBis dans mon Service');
    return this.httpClient.post<Quizz>('http://localhost:5366/quizzs/', quizz, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  // *** METHODE DELETE ***//

  deleteMotQuizz(animauxId) {
    console.log('passe dans deleteMotQuizz dans mon httpClientService');
    console.log('animauxId vaut : ' + animauxId);
    console.log('url vaut : ' + 'http://localhost:5366/quizzs/delete/' + animauxId);
    return this.httpClient.delete('http://localhost:5366/quizzs/delete/' + animauxId);
  }

}
