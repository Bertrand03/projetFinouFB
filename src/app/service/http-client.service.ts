import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";



export class Employee {
  constructor(
    public empId: string,
    public name: string,
    public designation: string,
    public salary: string,
  ) {}
}

export class Quizz {
  constructor(
    public AnimauxId: number,
    public motFrancais: string,
    public motAnglais: string,
    public motTrouve: string,
  ) {}
}

export class Joueur {
  constructor(
    public id: number,
    public pseudo: string,
    public score: number,
  ) {}
}



@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  reponseChoix: string;
  url: string;
  recupObjet: Observable<any>;
  tableauFiltre: Observable<any>;
  urlApi = 'http://localhost:5366/quizzs/';
  objetQuizz: Quizz;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  // getEmployees() {
  //   console.log('test call');
  //   return this.httpClient.get<Employee[]>('http://localhost:8080/employees');
  // }

  getEmployees() {
    console.log('test call');
    console.log('url dans getEmployees vaut : ' + this.url);
    // return this.httpClient.get<Quizz>('http://localhost:5366/quizzs/?name=Chien');
    return this.httpClient.get('http://localhost:5366/quizzs/');
    // return this.httpClient.get('http://localhost:5432/quizzs');
  }
  getId(url) {
    console.log('Lancement getId() : ');
    console.log('url dans Service : ' + url);
    console.log('this.httpClient.get(this.url)' + this.httpClient.get(this.url));
    this.recupObjet = this.httpClient.get(this.url);
    console.log('recupObjet' + this.recupObjet);
    console.log('recupObjet[0]' + this.recupObjet[0]);
    return this.httpClient.get(this.url);
  }

  getIdBis(reponseChoix) {
      console.log('passe dans getIdBis, reponseChoix vaut : ' + reponseChoix);
      this.tableauFiltre = this.httpClient.get('http://localhost:5366/quizzs/' + reponseChoix);
      console.log('tableau filtre : ');
      console.log(this.tableauFiltre);
      return this.tableauFiltre;
  }

  addNickname(pseudoDuJoueur) {
    console.log('pseudoDuJoueur dans le service vaut : ' + pseudoDuJoueur);
  }

  addAnimal(nouvelAnimal: object): Observable<object> {
    console.log('nouvelAnimal dans le service vaut : ');
    console.log(nouvelAnimal);
    return this.httpClient.post<Quizz>(this.urlApi, nouvelAnimal);
    // return this.httpClient.post<Quizz>(this.urlApi, 'helloTest');

  }

}
