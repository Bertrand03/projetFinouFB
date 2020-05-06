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
    // console.log(this.httpClient.get('http://localhost:5366/quizzs/?name=Chat'));
    // return this.httpClient.get<Quizz>('http://localhost:5366/quizzs/?name=Chien');
    return this.httpClient.get('http://localhost:5366/quizzs/');
    // return this.httpClient.get('http://localhost:5366/quizzs');
  }
}
