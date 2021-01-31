import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategorieQuizz, HttpClientService, Joueur, Quizz, Score} from "../service/http-client.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../service/authService/auth.service";
import {ToolsBoxService} from "../service/toolsBoxService/tools-box-service";

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
  quizzSelParId: Quizz;

  monTabBis: Quizz;
  majAnimal: Quizz;
  monTabJoueurs: Joueur;

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
  motASupprimer: Observable <any>;
  nomCategorieDuMotCreee: string;
  motASupBis: string;
  motARechercher: string;

  joueurSelectionne: Joueur;
  listCategoriesQuizz: any;

  categorieId: number;
  categorieQuizz: any;

  nomCategorieSelectionnee: string;
  quizzRetourne: Quizz;


  constructor(private fb: FormBuilder,
              private httpClient: HttpClient,
              private httpClientService: HttpClientService,
              private authService: AuthService,
              private toolsBoxService: ToolsBoxService) {
  }

  ngDoCheck() {
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({

      rechercheMot: [],
      pseudoId: [],
      pseudoJoueur: [],
      motDePasse: [],
      pseudoScore: [],
      motAnglais: [],
      motFrancais: [],
      motTrouve: [],
      idMotASupprimer: [],
      nomMotASupprimer: [],
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

    this.httpClientService.getAllCategorieQuizzService().subscribe(
      categorieQuizz => this.returnListAllCategorieQuizz(categorieQuizz)
    );
  }


  returnListAllCategorieQuizz(categorieQuizz) {
    console.log('lance returnListAllCategorieQuizz');
    this.listCategoriesQuizz = categorieQuizz;
    console.log('listCategoriesQuizz vaut : ');
    console.log(this.listCategoriesQuizz);
  }

  getCategorieIdWithNomCategorie(categorieId) {
    console.log('lance getCategorieIdWithNomCategorie');
    console.log('categorieId vaut : ' + categorieId);
    this.categorieId = categorieId;
    return this.categorieId;
  }

  getNomCategorieSelectionnee(nomCategorie) {
    this.nomCategorieSelectionnee = nomCategorie;
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
    this.quizzSelParId = response;

  }

  trouveParId() {
    this.reponseChoix = this.loginForm.value.choixAction;
    console.log('reponseChoix : ' + this.reponseChoix);

    this.httpClientService.getIdBis(this.reponseChoix).subscribe(
      response => this.resultatParId(response, this.reponseChoix),
    );
  }

  validerPseudo() {
    this.pseudoDuJoueurId = parseInt(this.loginForm.value.pseudoId, 10);
    this.pseudoDuJoueur = this.loginForm.value.pseudoJoueur;
    this.motDePasse = this.loginForm.value.motDePasse;
    this.pseudoDuJoueurScore = parseInt(this.loginForm.value.pseudoScore, 10);

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
    console.log('passe dans addAnimalBis()');
    this.afficheAnimalCree = false;
    this.nouveauMotAnglais = this.loginForm.value.motAnglais;
    this.nouveauMotFrancais = this.loginForm.value.motFrancais;
    this.nouveauMotTrouve = 'non';
    this.nouveauMotId = 0;

    // this.nouveauCategorieMotId = parseInt(this.loginForm.value.motCategorieId, 10);
    this.nouveauCategorieMotId = this.categorieId;
    console.log('this.nouveauCategorieMotId avant subscribe vaut : ' + this.nouveauCategorieMotId);

    this.httpClientService.getCategorieQuizzbyId(this.nouveauCategorieMotId).subscribe(
        categorieQuizz => this.getNomCategorieByCategorieId(categorieQuizz)
    );

    if (this.nouveauMotAnglais !== null && this.nouveauMotFrancais !== null && this.nouveauCategorieMotId !== null) {
      this.nouveauMotAnglais = this.toolsBoxService.upcaseFirstLetterOfSentence(this.nouveauMotAnglais);
      this.nouveauMotFrancais = this.toolsBoxService.upcaseFirstLetterOfSentence(this.nouveauMotFrancais);
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

  getNomCategorieByCategorieId(categorieQuizz) {
    console.log('Lance getNomCategorieByCategorieId : ');
    console.log('categorieId vaut : ');
    console.log(categorieQuizz);
    this.categorieQuizz = categorieQuizz;
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
    this.idToDelete = parseInt((this.loginForm.value.idMotASupprimer), 10);
    this.httpClientService.getIdBis(this.idToDelete).subscribe(
      (response: Quizz) => {
        console.log('response onDeleteAnimal()');
        console.log(response);
      },
      (e: any) => console.log(e)
    );


    console.log('this.motASupprimer vaut : ');
    console.log(this.motASupprimer);
    console.log('id du mot à supprimer vaut : ' + this.idToDelete);
    this.httpClientService.deleteMotQuizz(this.idToDelete).subscribe();
  }

  onDeleteMotQuizz(idMotASupprimer) {
    this.httpClientService.getIdBis(idMotASupprimer).subscribe(
      (response: Quizz) => {
        console.log('response onDeleteMotQuizz()');
        console.log(response);
      },
      (e: any) => console.log(e)
    );


    console.log('this.idMotASupprimer vaut : ');
    console.log(idMotASupprimer);
    this.httpClientService.deleteMotQuizz(idMotASupprimer).subscribe();
  }

  getQuizzByMot(choix) {
    if (choix === 'supprime') {
      console.log('dans getQuizzByMot(), choix vaut supprime')
      this.motARechercher = this.loginForm.value.nomMotASupprimer;
    }
    this.motARechercher = this.loginForm.value.rechercheMot;
    this.httpClientService.getQuizzbyMotService(this.motARechercher).subscribe(
      (quizzretourne: Quizz) => {
        this.quizzRetourne = quizzretourne;
        console.log('this.quizzRetourne vaut ');
        console.log(this.quizzRetourne);
        if (choix === 'supprime') {
          this.onDeleteMotQuizz(this.quizzRetourne.animauxId);
        }
      }
    );
  }
}

