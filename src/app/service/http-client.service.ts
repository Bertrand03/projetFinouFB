import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



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


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  reponseChoix: string;
  url: string;

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
    // return this.httpClient.get('http://localhost:5366/quizzs');
  }
  getId(url) {
    console.log('Lancement getId() : ');
    console.log('url dans Service : ' + url);
    return this.httpClient.get(this.url);
  }
}
