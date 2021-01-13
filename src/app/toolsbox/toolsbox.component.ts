import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategorieQuizz, HttpClientService, Joueur, Quizz, Score} from "../service/http-client.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../service/authService/auth.service";

@Component({
  selector: 'app-toolsbox',
  templateUrl: './toolsbox.component.html',
  styleUrls: ['./toolsbox.component.scss']
})
export class ToolsboxComponent implements OnInit, DoCheck {

  loginForm: FormGroup;
  reponseChoix: string;
  urlApi = 'http://localhost:5366/quizzs/';
  idToDelete: number;


  choix: string[];
  allPlayers: Joueur;
  score: Score;

  employeesId: Array<any>;

  monTabBis: Quizz;
  majAnimal: Quizz;
  monTabJoueurs: Joueur;

  playertoDelete: string;
  idPlayerToDelete: number;
  scoreParJoueurEtParCategorie: number;

  // Mes variables d'input
  pseudoDuJoueurId: number;
  pseudoDuJoueur: string;
  motDePasse: string;
  pseudoDuJoueurScore: number;

  nouveauMotId: number;
  nouveauCategorieMotId: number;
  nouveauMotAnglais: string;
  nouveauMotFrancais: string;
  nouveauMotTrouve: string;

  afficheAnimalCree: boolean;
  CategorieDuMotCreee: Observable <CategorieQuizz>;
  nomCategorieDuMotCreee: string;

  joueurSelectionne: Joueur;
  scoreCateg: number;


  constructor(private fb: FormBuilder,
              private httpClient: HttpClient,
              private httpClientService: HttpClientService,
              private authService: AuthService) {
  }

  ngDoCheck() {
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({

      choixAction: [],
      pseudoId: [],
      pseudoJoueur: [],
      motDePasse: [],
      pseudoScore: [],
      motAnglais: [],
      motFrancais: [],
      motTrouve: [],
      motId: [],
      motCategorieId: [],
      deletePlayer: []

    });

    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.httpClientService.getJoueurs().subscribe(
      response => this.getAllOfPlayers(response),
    );

    this.httpClientService.getScore().subscribe(
      response => this.resultatGetScore(response),
    );
  }

  getScoreJoueurCategorie() {
    this.httpClientService.getScoreParJoueurEtCategorieQuizz(this.joueurSelectionne.id, 2).subscribe(
      resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
    );
  }

  resultatGetScoreParJoueurEtCategorieQuizz(resultat) {
    this.scoreParJoueurEtParCategorie = resultat;
    this.scoreCateg = resultat.score;
  }

  resultatGetScore(response) {
    console.log('response : ');
    console.log(response);
    this.score = response;
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

  // onUpdateAnimal() {
  //   this.reponseChoix = this.loginForm.value.choixAction;
  //   console.log('reponseChoix : ' + this.reponseChoix);
  //
  //   this.httpClientService.putAnimal(this.reponseChoix).subscribe(
  //     response => this.apresMaj(response, this.reponseChoix),
  //   );
  // }

  validerPseudo() {
    this.pseudoDuJoueurId = parseInt(this.loginForm.value.pseudoId, 10);
    this.pseudoDuJoueur = this.loginForm.value.pseudoJoueur;
    this.motDePasse = this.loginForm.value.motDePasse;
    this.pseudoDuJoueurScore = parseInt(this.loginForm.value.pseudoScore, 10);

    // this.monTabJoueurs = new Joueur(this.pseudoDuJoueurId, this.pseudoDuJoueur, this.pseudoDuJoueurScore);
    this.monTabJoueurs = new Joueur(0, this.pseudoDuJoueur, this.motDePasse, 0);
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
    this.afficheAnimalCree = false;
    this.nouveauMotAnglais = this.loginForm.value.motAnglais;
    this.nouveauMotFrancais = this.loginForm.value.motFrancais;
    this.nouveauMotTrouve = 'non';
    // this.nouveauMotId = parseInt(this.loginForm.value.motId, 10);
    this.nouveauMotId = 0;
    this.nouveauCategorieMotId = parseInt(this.loginForm.value.motCategorieId, 10);

    this.httpClientService.getContenuCategorieQuizz(this.nouveauCategorieMotId).subscribe(
      (contenuCategorie: CategorieQuizz) => {
        this.nomCategorieDuMotCreee = contenuCategorie.nomCategorie;
        console.log('nomCategorieDuMotCreee vaut : ' + this.nomCategorieDuMotCreee);
      }
    );

    console.log('valueOf ');
    console.log('categMotId' + typeof this.nouveauCategorieMotId);
    console.log('anglais' + typeof this.nouveauMotAnglais);
    console.log('francais' + typeof this.nouveauMotFrancais);

    if (this.nouveauMotAnglais !== null && this.nouveauMotFrancais !== null && this.nouveauCategorieMotId !== null) {
      this.monTabBis = new Quizz(this.nouveauMotId, this.nouveauCategorieMotId, this.nouveauMotFrancais, this.nouveauMotAnglais, this.nouveauMotTrouve);

      this.httpClientService.validerAnimalBis(this.monTabBis).subscribe(
        (contenuQuizz: Quizz) => {
          console.log('monTabBis avec AnimalBis');
          console.log(this.monTabBis);
          this.afficheAnimalCree = true;

        },
        (e: any) => console.log(e)
      );
    } else {
      alert('Tous les champs doivent être remplis');
    }
  }


  // *********** MISE A JOUR D'UN ANIMAL *************

  updateAnimalBis() {
    this.nouveauMotAnglais = this.loginForm.value.motAnglais;
    this.nouveauMotFrancais = this.loginForm.value.motFrancais;
    this.nouveauMotTrouve = this.loginForm.value.motTrouve;
    this.nouveauMotId = parseInt(this.loginForm.value.motId, 10);
    this.nouveauCategorieMotId = parseInt(this.loginForm.value.motCategorieId, 10);

    this.majAnimal = new Quizz(this.nouveauMotId, this.nouveauCategorieMotId, this.nouveauMotFrancais, this.nouveauMotAnglais, this.nouveauMotTrouve);
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

