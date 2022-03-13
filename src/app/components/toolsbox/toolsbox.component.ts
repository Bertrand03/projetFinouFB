import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClientService} from '../../service/httpClientService/http-client.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../service/authService/auth.service';
import {Quizz} from '../../models/quizz.model';
import {Score} from "../../models/score.model";
import {Joueur} from "../../models/joueur.model";
import {QuizzService} from "../../service/quizzService/quizz.service";
import {ToolsBoxService} from "../../service/toolsBoxService/tools-box-service";
import {error} from "selenium-webdriver";

@Component({
  selector: 'app-toolsbox',
  templateUrl: './toolsbox.component.html',
  styleUrls: ['./toolsbox.component.scss']
})
export class ToolsboxComponent implements OnInit, DoCheck, OnChanges {

  loginForm: FormGroup;
  choix: string[];
  allPlayers: Joueur;
  score: Score;

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
  newEnglishWord: string;
  newFrenchWord: string;
  wordToAddInDataBase: Quizz;

  nouveauMotTrouve: string;

  afficheAnimalCree: boolean;

  joueurSelectionne: Joueur;
  listCategoriesQuizz: any;

  categorieId: number;
  categorieQuizz: any;

  nomCategorieSelectionnee: string;
  quizzRetourne: Quizz;

  displayWordCreated = false;
  previousCategorySelected: string =  null;

  nameWordToDelete: string;
  wordToDelete: Quizz;
  listOfWords: Quizz[];

  displaySearchedWord: Quizz[];


  constructor(private fb: FormBuilder,
              private httpClient: HttpClient,
              private httpClientService: HttpClientService,
              private toolsBoxService: ToolsBoxService,
              private quizzService: QuizzService,
              private authService: AuthService) {
  }

  ngDoCheck() {
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categorieId) {
      console.log('NgOnChanges Toolbox');
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({

      searchWord: [],
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
      deletePlayer: [],
      formDeleteWord: [],
      formButtonRadio: []

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

    this.categorieId = null;
    console.log('categorieId vaut ' + this.categorieId);
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
    // if (this.previousCategorySelected === null) {
    //  this.previousCategorySelected = this.nomCategorieSelectionnee;
    // } else {
    //   if (this.previousCategorySelected === this.nomCategorieSelectionnee) {
    //     // On ne fait rien
    //   } else {
    //     this.previousCategorySelected = this.nomCategorieSelectionnee;
    //   }
    // }
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

  // trouveParId() {
  //   this.reponseChoix = this.loginForm.value.choixAction;
  //   console.log('reponseChoix : ' + this.reponseChoix);
  //
  //   this.httpClientService.getIdBis(this.reponseChoix).subscribe(
  //     response => this.resultatParId(response, this.reponseChoix),
  //   );
  // }

  validerPseudo() {
    console.log('passe dans validerPseudo !!! ');
    this.pseudoDuJoueurId = parseInt(this.loginForm.value.pseudoId, 10);
    this.pseudoDuJoueur = this.loginForm.value.pseudoJoueur;
    this.motDePasse = this.loginForm.value.motDePasse;
    this.pseudoDuJoueurScore = parseInt(this.loginForm.value.pseudoScore, 10);

    this.monTabJoueurs = new Joueur(0, this.pseudoDuJoueur, this.motDePasse);
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

  // addAnimalBis(): void {
  //   console.log('passe dans addAnimalBis()');
  //   this.afficheAnimalCree = false;
  //   this.nouveauMotAnglais = this.loginForm.value.motAnglais;
  //   this.nouveauMotFrancais = this.loginForm.value.motFrancais;
  //   this.nouveauMotTrouve = 'non';
  //   this.nouveauMotId = 0;
  //
  //   // this.nouveauCategorieMotId = parseInt(this.loginForm.value.motCategorieId, 10);
  //   this.nouveauCategorieMotId = this.categorieId;
  //   console.log('this.nouveauCategorieMotId avant subscribe vaut : ' + this.nouveauCategorieMotId);
  //
  //   this.httpClientService.getCategorieQuizzbyId(this.nouveauCategorieMotId).subscribe(
  //       categorieQuizz => this.getNomCategorieByCategorieId(categorieQuizz)
  //   );
  //
  //   if (this.nouveauMotAnglais !== null && this.nouveauMotFrancais !== null && this.nouveauCategorieMotId !== null) {
  //     this.nouveauMotAnglais = this.toolsBoxService.upcaseFirstLetterOfSentence(this.nouveauMotAnglais);
  //     this.nouveauMotFrancais = this.toolsBoxService.upcaseFirstLetterOfSentence(this.nouveauMotFrancais);
  //     this.monTabBis = new Quizz(this.nouveauMotId, this.nouveauCategorieMotId, this.nouveauMotFrancais, this.nouveauMotAnglais, this.nouveauMotTrouve);
  //
  //     this.httpClientService.validerAnimalBis(this.monTabBis).subscribe(
  //       (contenuQuizz: Quizz) => {
  //         console.log('monTabBis avec AnimalBis');
  //         console.log(this.monTabBis);
  //         this.afficheAnimalCree = true;
  //
  //       },
  //       (e: any) => console.log(e)
  //     );
  //   } else {
  //     alert('Tous les champs doivent être remplis');
  //   }
  // }

  // *********** MISE A JOUR D'UN ANIMAL *************

  updateAnimalBis() {
    this.newEnglishWord = this.loginForm.value.motAnglais;
    this.newFrenchWord = this.loginForm.value.motFrancais;
    this.nouveauMotTrouve = this.loginForm.value.motTrouve;
    this.nouveauMotId = parseInt(this.loginForm.value.motId, 10);
    this.nouveauCategorieMotId = parseInt(this.loginForm.value.motCategorieId, 10);

    this.majAnimal = new Quizz(this.nouveauMotId, this.nouveauCategorieMotId, this.newFrenchWord, this.newEnglishWord, this.nouveauMotTrouve, null);
    console.log('majAnimal vaut : ');
    console.log(this.majAnimal);

    this.quizzService.updateQuizzWord(this.majAnimal).subscribe(
      (contenuAnimal: Quizz) => {
        console.log('contenuAnimal après modif');
        // console.log(this.majAnimal);
        console.log(contenuAnimal);
      },
      (e: any) => console.log(e)
    );
  }

  onDeleteWord() {

    this.nameWordToDelete = this.loginForm.value.formDeleteWord;
    // this.quizzService.getWordsByName(this.nameWordToDelete).subscribe( value => this.retrieveWordIdByName(value));
    this.quizzService.getWordsByName(this.nameWordToDelete).subscribe((listOfWords: Quizz[]) =>
    this.listOfWords = listOfWords);
    console.log('this.listOfWords : ');
    console.log(this.listOfWords);
    let wordToDelete = this.listOfWords[this.loginForm.value.formButtonRadio];
    console.log('wordToDelete vaut : ' + wordToDelete.motAnglais + ' ' + wordToDelete.animauxId);
    this.quizzService.deleteQuizzWord(wordToDelete).subscribe(() =>
      console.log('mot supprimé : '),
      error => console.log('error : ' + error));
  }

  searchWord() {
    let wordToSearch = this.loginForm.value.searchWord;
    console.log('avant nettoyage mot vaut : ' + wordToSearch);
    console.log('length : ' + wordToSearch.length);
    wordToSearch = this.toolsBoxService.trimAndClean(wordToSearch);
    console.log('après nettoyage mot vaut : ' + wordToSearch);
    console.log('length : ' + wordToSearch.length);
    this.quizzService.getWordsByName(wordToSearch).subscribe((value: Quizz[]) => {
      this.displaySearchedWord = value;
    });
  }

  // onDeleteAnimal() {
  //   this.idToDelete = parseInt((this.loginForm.value.idMotASupprimer), 10);
  //   this.httpClientService.getIdBis(this.idToDelete).subscribe(
  //     (response: Quizz) => {
  //       console.log('response onDeleteAnimal()');
  //       console.log(response);
  //     },
  //     (e: any) => console.log(e)
  //   );
  //
  //
  //   console.log('this.motASupprimer vaut : ');
  //   console.log(this.motASupprimer);
  //   console.log('id du mot à supprimer vaut : ' + this.idToDelete);
  //   this.httpClientService.deleteMotQuizz(this.idToDelete).subscribe();
  // }

  // onDeleteMotQuizz(idMotASupprimer) {
  //   this.httpClientService.getIdBis(idMotASupprimer).subscribe(
  //     (response: Quizz) => {
  //       console.log('response onDeleteMotQuizz()');
  //       console.log(response);
  //     },
  //     (e: any) => console.log(e)
  //   );
  //
  //
  //   console.log('this.idMotASupprimer vaut : ');
  //   console.log(idMotASupprimer);
  //   this.httpClientService.deleteMotQuizz(idMotASupprimer).subscribe();
  // }

  // getQuizzByMot(choix) {
  //   if (choix === 'supprime') {
  //     console.log('dans getQuizzByMot(), choix vaut supprime')
  //     this.motARechercher = this.loginForm.value.nomMotASupprimer;
  //   }
  //   this.motARechercher = this.loginForm.value.rechercheMot;
  //   this.httpClientService.getQuizzbyMotService(this.motARechercher).subscribe(
  //     (quizzretourne: Quizz) => {
  //       this.quizzRetourne = quizzretourne;
  //       console.log('this.quizzRetourne vaut ');
  //       console.log(this.quizzRetourne);
  //       if (choix === 'supprime') {
  //         this.onDeleteMotQuizz(this.quizzRetourne.animauxId);
  //       }
  //     }
  //   );
  // }

  retrieveCategorieId(categorieId) {
    this.categorieId = categorieId;
    console.log('categorieId vaut ' + this.categorieId);
  }

  addWordQuizz() {
    // TODO Contrôler avec des Regex et mettre le premier caractère en majuscule
    this.newEnglishWord = this.loginForm.value.motAnglais;
    this.newFrenchWord = this.loginForm.value.motFrancais;

    // Première lettre de chaque mot passe en majuscule
    this.newEnglishWord = this.toolsBoxService.upcaseFirstLetterOfSentence(this.newEnglishWord);
    this.newFrenchWord = this.toolsBoxService.upcaseFirstLetterOfSentence(this.newFrenchWord);

    this.wordToAddInDataBase = new Quizz(0, this.categorieId, this.newFrenchWord, this.newEnglishWord, 'non', null);
    this.quizzService.addNewWord(this.wordToAddInDataBase).subscribe(
      () => {
        console.log('addWordQuizz');
        this.displayWordCreated = true;
        if (this.previousCategorySelected === null) {
          this.previousCategorySelected = this.nomCategorieSelectionnee;
        } else {
          if (this.previousCategorySelected === this.nomCategorieSelectionnee) {
            // On ne fait rien
          } else {
            this.previousCategorySelected = this.nomCategorieSelectionnee;
          }
        }
      },
      (e: any) => console.log(e)
    );
  }


}

