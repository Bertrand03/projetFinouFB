import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpClientService, Quizz} from '../service/http-client.service';
import {Observable} from "rxjs";

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
  nouvelAnimal: string[];
  // newAnimal: Quizz;
  nouvelAnimalBis: Observable<any>;
  pseudoDuJoueur: string;
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
        pseudoJoueur: [],
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

  validerPseudo() {
    this.pseudoDuJoueur = this.loginForm.value.pseudoJoueur;
    console.log('Pseudo du joueur dans validerPseudo() vaut : ' + this.pseudoDuJoueur);
    this.httpClientService.addNickname(this.pseudoDuJoueur);

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

}
