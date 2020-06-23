import { Component, OnInit } from '@angular/core';
import {HttpClientService, Quizz} from '../service/http-client.service';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

    employees: string[];
    joueurs: string[];
    loginForm: FormGroup;
    reponseMotJoueur: string;
    motRecherche: any;
    motAComparer: string;

  constructor(
    private httpClientService: HttpClientService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.httpClientService.getJoueurs().subscribe(
      listeJoueurs => this.maMethode(listeJoueurs),
    );

    this.loginForm = this.formBuilder.group({
      formMotJoueur: []

    });
  }
  handleSuccessfulResponse(response) {
    console.log('response : ');
    console.log(response);
    this.employees = response;
  }

  maMethode(listeJoueurs) {
    console.log('response Joueurs: ');
    console.log(listeJoueurs);
    this.joueurs = listeJoueurs;
  }

  onValideMotJoueur(indexMotATrouver) {
    this.reponseMotJoueur =  this.loginForm.value.formMotJoueur;
    console.log('Mot Joueur : ' + this.reponseMotJoueur);
    console.log('indexMotATrouver : ' + indexMotATrouver);
    this.motAComparer = this.recupMotRecherche(indexMotATrouver);
    console.log('motAComparer vaut : ' + this.motAComparer);
    this.verifSiMotJoueurEstJuste(this.reponseMotJoueur, this.motAComparer);
  }

  recupMotRecherche(indexMotATrouver) {
    this.motRecherche = this.employees[indexMotATrouver];
    console.log('motRecherche vaut : ');
    console.log(this.motRecherche.motAnglais);
    return this.motRecherche.motAnglais;
  }

  verifSiMotJoueurEstJuste(reponseMotJoueur, motAComparer) {
    if (reponseMotJoueur === motAComparer) {
      console.log('Gagné, mot trouvé');

    } else {
      console.log('Perdu, le mot n\'est pas bon');
    }
  }
}
