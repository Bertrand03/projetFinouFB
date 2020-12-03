import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


export class Employee {
  constructor(
    public empId: string,
    public name: string,
    public designation: string,
    public salary: string,
  ) {
  }
}

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


@Injectable({
  providedIn: 'root'
})


export class HttpClientService {

  url: string;
  tableauFiltre: Observable<any>;
  contenuCategorieQuizz: Observable<any>;
  urlApi = 'http://localhost:5366/quizzs/';


  constructor(
    private httpClient: HttpClient
  ) {
  }

  getEmployees() {
    console.log('passe dans getEmployees()');
    return this.httpClient.get(this.urlApi);
  }

  getJoueurs() {
    return this.httpClient.get('http://localhost:5366/joueurs/');
  }
  
  getAllEnglishQuizzService() {
    console.log('Entre dans getAllEnglishQuizzService');
    return this.httpClient.get('http://localhost:5366/quizzs/');
  }

  getAllCategorieQuizzService() {
    console.log('Front-end - getAllCategorieQuizzService()');
    return this.httpClient.get('http://localhost:5366/trouve-anglais/');
  }

  getId(url) {
    console.log('Lancement getId() : ');
    console.log('url dans Service : ' + url);
    return this.httpClient.get(this.url);
  }

  getContenuCategorieQuizz(categorieId) {
    console.log('Front-end - getContenuCategorieQuizz()');
    console.log('categorieId vaut : ' + categorieId);
    this.contenuCategorieQuizz = this.httpClient.get('http://localhost:5366/quizzs/categorie/' + categorieId);
    // console.log('contenuCategorieQuizz vaut : ');
    // console.log(this.contenuCategorieQuizz);
    return this.contenuCategorieQuizz;
  }

  getIdBis(reponseChoix) {
    console.log('passe dans getIdBis, reponseChoix vaut : ' + reponseChoix);
    this.tableauFiltre = this.httpClient.get('http://localhost:5366/quizzs/' + reponseChoix);
    console.log('tableau filtre : ');
    console.log(this.tableauFiltre);
    return this.tableauFiltre;
  }

  putAnimal(reponseChoix) {
    console.log('passe dans putAnimal, reponseChoix vaut : ' + reponseChoix);
    return this.httpClient.put('http://localhost:5366/quizzs/' + reponseChoix, Quizz, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  addAnimal(nouvelAnimal: object): Observable<object> {
    console.log('nouvelAnimal dans le service vaut : ');
    console.log(nouvelAnimal);
    return this.httpClient.post<Quizz>(this.urlApi, nouvelAnimal);
    // return this.httpClient.post<Quizz>(this.urlApi, 'helloTest');

  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Client Side Error: ', errorResponse);
    }
    return new Error();
  }

  addNickname(pseudoDuJoueur: Joueur): Observable<Joueur> {
    console.log('passe dans addNickName');
    return this.httpClient.post<Joueur>('http://localhost:5366/joueurs/', pseudoDuJoueur, {
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

  validerAnimalBis(quizz: Quizz): Observable<Quizz> {
    console.log('passe dans ValiderAnimalBis dans mon Service');
    return this.httpClient.post<Quizz>('http://localhost:5366/quizzs/', quizz, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  majAnimalBisService(quizz: Quizz): Observable<Quizz> {
    console.log('passe dans majAnimalBisService');
    console.log('animal mis à jour vaut :');
    console.log(quizz);

    const url = `${this.urlApi}/update/${quizz.animauxId}`;
    console.log('quizz.animauxId vaut : ', quizz.animauxId);
    console.log('url : ');
    console.log(this.url);
    return this.httpClient.put<Quizz>(url, quizz, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  resetAllMotTrouveService(quizz: Quizz): Observable<Quizz> {
    console.log('passe dans resetAllMotTrouveService');
    console.log('animal mis à jour vaut :');
    console.log(quizz);

    const url = `${this.urlApi}/update/reset`;
    console.log('url : ');
    console.log(this.url);
    return this.httpClient.put<Quizz>(url, quizz, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  onDeleteAnimalService(id: number): Observable<any> {
    const url = `${this.urlApi}${id}`;
    console.log('url vaut : ', url);
    console.log('Id à supprimer : ' + id);
    return this.httpClient.delete(url);
  }

  onUpdateAnimalService(id: number): Observable<any> {
    const url = `${this.urlApi}${id}`;
    console.log('url vaut : ', url);
    console.log('Id à mettre à jour : ' + id);
    return this.httpClient.post(url, Quizz);
  }

}
