import { Component, OnInit } from '@angular/core';
import {HttpClientService, Quizz} from '../service/httpClientService/http-client.service';
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
    motTrouveRecherche: string;
    motTrouveRechercheId: number;
    motTrouveParJoueur: any;
    x: any;
    booleenAChanger: any;

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
    // console.log('Mot Joueur : ' + this.reponseMotJoueur);
    // console.log('indexMotATrouver : ' + indexMotATrouver);
    this.motAComparer = this.recupMotRecherche(indexMotATrouver);
    this.motTrouveRecherche = this.employees[indexMotATrouver];
    console.log('motAComparer vaut : ' + this.motAComparer);
    console.log('motTrouveRecherche vaut : ');
    console.log(this.motTrouveRecherche);
    this.x = this.motTrouveRecherche;
    this.motTrouveRecherche = this.x.motTrouve;
    this.motTrouveRechercheId = this.x.animauxId;
    console.log('motTrouve vaut : ');
    console.log(this.motTrouveRecherche);
    console.log('motTrouveId vaut : ');
    console.log(this.motTrouveRechercheId);
    // console.log('indexMotATrouver vaut : ' + indexMotATrouver);
    this.verifSiMotJoueurEstJuste(this.reponseMotJoueur, this.motAComparer, this.motTrouveRechercheId, this.x);
  }

  recupMotRecherche(indexMotATrouver) {
    this.motRecherche = this.employees[indexMotATrouver];
    console.log('motRecherche vaut : ');
    console.log(this.motRecherche.motAnglais);
    return this.motRecherche.motAnglais;
  }


  verifSiMotJoueurEstJuste(reponseMotJoueur, motAComparer, motTrouveRechercheId, x) {
    if (reponseMotJoueur === motAComparer) {
      console.log('indexMotATrouver vaut : ' + motTrouveRechercheId);
      console.log('x vaut : ' );
      console.log(x);
      this.httpClientService.changeMotTrouveByYes(motTrouveRechercheId, x)
      console.log('Gagné, mot trouvé');
    } else {
      console.log('Perdu, le mot n\'est pas bon');
    }
  }
}
