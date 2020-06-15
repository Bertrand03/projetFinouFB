import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    employees: string[];
    joueurs: string[];

  constructor(
    private httpClientService: HttpClientService
  ) { }
  ngOnInit() {
    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.httpClientService.getJoueurs().subscribe(
      listeJoueurs => this.maMethode(listeJoueurs),
    );
  }
  handleSuccessfulResponse(response) {
    console.log('response Quizz: ');
    console.log(response);
    this.employees = response;
  }

  maMethode(listeJoueurs) {
    console.log('response Joueurs: ');
    console.log(listeJoueurs);
    this.joueurs = listeJoueurs;
  }
}
