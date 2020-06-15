import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {HttpClientService, Joueur, Quizz} from '../service/http-client.service';
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {error} from "selenium-webdriver";
// import {ErrorObserver} from 'rxjs/observable/ErrorObservable';

@Component({
  selector: 'app-choix-action',
  templateUrl: './choix-action.component.html',
  styleUrls: ['./choix-action.component.scss']
})
export class ChoixActionComponent implements OnInit {

  loginForm: FormGroup;
  reponseChoix: string;
  contenuQuizz: Array<object>;
  url: string;
  choix: string[];
  // employeesId: string[];
  employeesId: Array<any>;
  monTab: Quizz;
  monTabBis: Quizz;
  monTabJoueurs: Joueur;
  nouvelAnimal: string[];
  // newAnimal: Quizz;
  newAnimalBis: Quizz;
  nouvelAnimalBis: Observable<any>;
  pseudoDuJoueurId: number;
  pseudoDuJoueur: string;
  pseudoDuJoueurScore: number;
  nouveauMotId: number;
  nouveauMotAnglais: string;
  nouveauMotFrancais: string;
  nouveauMotTrouve: string;
  // employeesId: Array<Quizz>;
  // nouvelAnimal2 = Quizz[this.nouveauMotAnglais, this.nouveauMotFrancais, this.nouveauMotTrouve];

  newAnimal = this.httpClientService.objetQuizz;



  constructor(private fb: FormBuilder, private httpClient: HttpClient, private httpClientService: HttpClientService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
        choixAction: [],
        pseudoId: [],
        pseudoJoueur: [],
        pseudoScore: [],
        motAnglais: [],
        motFrancais: [],
        motTrouve: [],
        motId: []
  });


    // this.httpClientService.getEmployees().subscribe(
    //   url => this.handleSuccessfulResponse(url),
    // );
    //
    // this.httpClientService.getEmployees().subscribe(
    //   response => this.handleSuccessfulResponse(response),
    // );
  }


  resultatParId(response, reponseChoix) {
    console.log('Entre dans resultatParId : ');
    console.log('response Quizz: ');
    console.log(response);
    console.log('reponseChoix : ');
    console.log(reponseChoix);
    // console.log('response[reponseChoix] : ');
    // console.log(response[reponseChoix]);
    // response = response[reponseChoix];
    console.log('type de response ' + typeof(response));
    this.employeesId = response;
    console.log('employeesId ' + typeof(this.employeesId));

  }

  trouveParId() {
    console.log('entre dans trouveParId : ');
    this.reponseChoix = this.loginForm.value.choixAction;
    console.log('reponseChoix : ' + this.reponseChoix);

    this.httpClientService.getIdBis(this.reponseChoix).subscribe(
      response => this.resultatParId(response, this.reponseChoix),
    );
  }

  handleSuccessfulResponse(response) {
    console.log('ma reponse vaut : ' );
    console.log(response);
    this.contenuQuizz = response;
  }

  validerAnimal() {

    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    // this.monTab = this.httpClientService.objetQuizz;
    // console.log('monTab[0] ' + this.monTab);
    console.log('contenuQuizz : ');
    console.log('Typeof contenuQuizz : ' + typeof(this.contenuQuizz));
    console.log(this.contenuQuizz);



    this.nouveauMotAnglais = this.loginForm.value.motAnglais;
    // console.log('nouveauMotAnglais ' + this.nouveauMotAnglais);
    // this.nouvelAnimal.push(this.nouveauMotAnglais);
    // console.log('nouvelAnimal apres ' + this.nouvelAnimal);
    this.nouveauMotFrancais = this.loginForm.value.motFrancais;
    this.nouveauMotTrouve = this.loginForm.value.motTrouve;
    this.nouveauMotId = parseInt(this.loginForm.value.motId, 10);
    // this.nouvelAnimal.push('0', this.nouveauMotAnglais, this.nouveauMotFrancais, this.nouveauMotTrouve);

    // console.log('nouveauMotId ' + this.nouveauMotId);

    this.contenuQuizz.push(
      {animauxId: this.nouveauMotId, motAnglais: this.nouveauMotAnglais, motFrancais: this.nouveauMotFrancais, motTrouve: this.nouveauMotTrouve});

    console.log('contenuQuizz apres push : ');
    console.log(this.contenuQuizz);
    this.httpClientService.addAnimal(this.contenuQuizz);

  }

  validerPseudo() {
    this.pseudoDuJoueurId = parseInt(this.loginForm.value.pseudoId, 10);
    this.pseudoDuJoueur = this.loginForm.value.pseudoJoueur;
    this.pseudoDuJoueurScore = parseInt(this.loginForm.value.pseudoScore, 10)

    this.monTabJoueurs = new Joueur(this.pseudoDuJoueurId, this.pseudoDuJoueur, this.pseudoDuJoueurScore);
    console.log('this.monTabJoueurs vaut : ');
    console.log(this.monTabJoueurs);
    this.httpClientService.addNickname(this.monTabJoueurs).subscribe(
      (nomDuJoueur: Joueur) => {
        console.log('monTabJoueursBis vaut : ');
        console.log(this.monTabJoueurs);
      },
      (e: any) => console.log(e)
      );
  }

  addAnimalBis(): void {
    this.nouveauMotAnglais = this.loginForm.value.motAnglais;
    this.nouveauMotFrancais = this.loginForm.value.motFrancais;
    this.nouveauMotTrouve = this.loginForm.value.motTrouve;
    this.nouveauMotId = parseInt(this.loginForm.value.motId, 10);

    this.monTabBis = new Quizz(this.nouveauMotId, this.nouveauMotFrancais, this.nouveauMotAnglais, this.nouveauMotTrouve);

    this.httpClientService.validerAnimalBis(this.monTabBis).subscribe(
      (contenuQuizz: Quizz) => {
        console.log('monTabBis avec AnimalBis');
        console.log(this.monTabBis);
      },
      (e: any) => console.log(e)
    );
  }

}
