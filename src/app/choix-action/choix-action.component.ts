import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import {HttpClientService, Joueur, Quizz} from '../service/http-client.service';


@Component({
  selector: 'app-choix-action',
  templateUrl: './choix-action.component.html',
  styleUrls: ['./choix-action.component.scss']
})
export class ChoixActionComponent implements OnInit {

  loginForm: FormGroup;
  reponseChoix: string;
  urlApi = 'http://localhost:5366/quizzs/';
  idToDelete: number;


  choix: string[];
  allPlayers: Joueur;

  employeesId: Array<any>;

  monTabBis: Quizz;
  majAnimal: Quizz;
  monTabJoueurs: Joueur;

  playertoDelete: string;
  idPlayerToDelete: number;

  // Mes variables d'input
  pseudoDuJoueurId: number;
  pseudoDuJoueur: string;
  pseudoDuJoueurScore: number;
  nouveauMotId: number;
  nouveauMotAnglais: string;
  nouveauMotFrancais: string;
  nouveauMotTrouve: string;


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
      motId: [],
      deletePlayer: []

    });

    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.httpClientService.getJoueurs().subscribe(
      response => this.getAllOfPlayers(response),
    );
  }

  handleSuccessfulResponse(response) {
    console.log('response : ');
    console.log(response);
    this.choix = response;
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
    console.log('type de response ' + typeof (response));
    this.employeesId = response;
    console.log('employeesId ' + typeof (this.employeesId));

  }

  apresMaj(response, reponseChoix) {
    console.log('Entre dans apresMaj: ');
    console.log('response Quizz: ');
    console.log(response);
    console.log('reponseChoix : ');
    console.log(reponseChoix);
    // console.log('response[reponseChoix] : ');
    // console.log(response[reponseChoix]);
    // response = response[reponseChoix];
    console.log('type de response ' + typeof (response));
    this.employeesId = response;
    console.log('employeesId ' + typeof (this.employeesId));

  }


  trouveParId() {
    this.reponseChoix = this.loginForm.value.choixAction;
    console.log('reponseChoix : ' + this.reponseChoix);

    this.httpClientService.getIdBis(this.reponseChoix).subscribe(
      response => this.resultatParId(response, this.reponseChoix),
    );
  }

  onUpdateAnimal() {
    this.reponseChoix = this.loginForm.value.choixAction;
    console.log('reponseChoix : ' + this.reponseChoix);

    this.httpClientService.putAnimal(this.reponseChoix).subscribe(
      response => this.apresMaj(response, this.reponseChoix),
    );
  }

  validerPseudo() {
    this.pseudoDuJoueurId = parseInt(this.loginForm.value.pseudoId, 10);
    this.pseudoDuJoueur = this.loginForm.value.pseudoJoueur;
    this.pseudoDuJoueurScore = parseInt(this.loginForm.value.pseudoScore, 10);

    // this.monTabJoueurs = new Joueur(this.pseudoDuJoueurId, this.pseudoDuJoueur, this.pseudoDuJoueurScore);
    this.monTabJoueurs = new Joueur(0, this.pseudoDuJoueur, 0);
    console.log('this.monTabJoueurs vaut : ');
    console.log(this.monTabJoueurs);
    this.httpClientService.addNickname(this.monTabJoueurs).subscribe(
      (nomDuJoueur: Joueur) => {
        console.log('monTabJoueursBis vaut : ');
        console.log(this.monTabJoueurs);
      },
      (e: any) => console.log(e)
    );


    this.httpClientService.getJoueurs().subscribe(
      response => this.getAllOfPlayers(response),
    );
  }

  getAllOfPlayers(reponse) {
    this.allPlayers = reponse;
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

  updateAnimalBis() {
    this.nouveauMotAnglais = this.loginForm.value.motAnglais;
    this.nouveauMotFrancais = this.loginForm.value.motFrancais;
    this.nouveauMotTrouve = this.loginForm.value.motTrouve;
    this.nouveauMotId = parseInt(this.loginForm.value.motId, 10);

    this.majAnimal = new Quizz(this.nouveauMotId, this.nouveauMotFrancais, this.nouveauMotAnglais, this.nouveauMotTrouve);
    console.log('majAnimal vaut : ');
    console.log(this.majAnimal);

    this.httpClientService.majAnimalBisService(this.majAnimal).subscribe(
      (contenuAnimal: Quizz) => {
        console.log('contenuAnimal après modif');
        // console.log(this.majAnimal);
        console.log(contenuAnimal);
      },
      (e: any) => console.log(e)
    );
  }

  onDeleteAnimal() {
    this.idToDelete = parseInt((this.loginForm.value.motId), 10);
    this.httpClientService.onDeleteAnimalService(this.idToDelete).subscribe();
  }


  // deleteHero(id: number): Observable<{}> {
  //   const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('deleteHero'))
  //     );
  // }

  supprimerJoueur() {
    this.playertoDelete = this.loginForm.value.deletePlayer;
    console.log('Joueur a supprimé est : ' + this.playertoDelete);
    console.log('allplayers vaut :');
    console.log(this.allPlayers);
    console.log(typeof (this.allPlayers[0]));

    console.log(this.allPlayers[0].pseudo);

    let stop = 'non';
    let i = 0;

    for (const ligne in this.allPlayers) {
      while (stop === 'non') {
        console.log('allplayers[i] vaut : ');
        if (this.allPlayers[i].pseudo === this.playertoDelete) {
          console.log('gagné');
          stop = 'oui';
          this.idPlayerToDelete = this.allPlayers[i].id;
          console.log('idplayer à sup : ' + this.idPlayerToDelete);
        }
        i++;
      }
    }

  }
}
