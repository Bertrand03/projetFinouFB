import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import {CategorieQuizz, HttpClientService, Joueur, Quizz, Score} from '../service/http-client.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../service/authService/auth.service';

@Component({
  selector: 'app-trouve-anglais',
  templateUrl: './trouve-anglais.component.html',
  styleUrls: ['./trouve-anglais.component.scss']
})
export class TrouveAnglaisComponent implements OnInit, DoCheck {

  @Output() monOutput = new EventEmitter<number>();

  listCategoriesQuizz: CategorieQuizz[];
  quizz: Quizz[];
  categorieIdChoisie: number;
  categorieChoisie: string;
  loginForm: FormGroup;
  motAnglaisSaisi: string;
  categorieId: number;
  retourMenuQuizz = false;
  nbTentatives: number;
  quiJoue: Joueur;
  motAEteDecouvert: boolean;

  joueurSelectionne: Joueur;
  scoreParJoueurEtParCategorie: Score;
  s: Score;
  scoreCategorieAUpdate: Score;
  scoreCateg: number;
  scoreUpdated: number;

  constructor(private httpClientService: HttpClientService,
              private authService: AuthService,
              private  httpClient: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.httpClientService.getAllCategorieQuizzService().subscribe(
      categorieQuizz => this.getAllCategorieQuizz(categorieQuizz),
    );

    this.loginForm = this.formBuilder.group({
        motAnglaisJoueur: [],
      }
    );

    this.motAEteDecouvert = false;
    console.log('motAEteDecouvert vaut : ' + this.motAEteDecouvert);
  }

  ngDoCheck() {
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
  }

  getScoreJoueurCategorie(categorieId) {
    this.httpClientService.getScoreParJoueurEtCategorieQuizz(this.joueurSelectionne.id, categorieId).subscribe(
      resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
    );
  }

  resultatGetScoreParJoueurEtCategorieQuizz(resultat) {
    this.scoreParJoueurEtParCategorie = resultat;
    this.scoreCateg =  resultat.scoreCategorie;
  }

  clearLoginForm() {
      this.loginForm.value.motAnglaisJoueur.clear();
  }

  onControlFrenchWord(ligne) {
    console.log('On entre dans onControlFrenchWord');
    console.log('ma ligne vaut :');
    console.log(ligne);
    this.motAEteDecouvert = false;
    this.motAnglaisSaisi = this.loginForm.value.motAnglaisJoueur;

    if (this.motAnglaisSaisi === ligne.motAnglais) {
      console.log('mot trouvé');
      ligne.motTrouve = 'oui';
      this.motAEteDecouvert = true;
      this.updateScoreByCategory(ligne);
      this.updateCategoryScore(this.scoreParJoueurEtParCategorie);
      this.updateAnimalBis(ligne);
    } else {
      console.log('mauvais mot');
    }
    this.compteurTentatives();
  }

    compteurTentatives() {
      this.nbTentatives ++;
      this.monOutput.emit(this.nbTentatives);
      console.log('nbTentatives vaut : ' + this.nbTentatives);
    }

    updateScoreByCategory(ligne) {
      console.log('lance updateScoreByCategory');
      console.log('ligne.categorieId vaut : ' + ligne.categorieId);
      this.httpClientService.getScoreByCategorieId(ligne.categorieId).subscribe(
        resultat => this.updateCategoryScore(resultat)
      );
    }

    updateCategoryScore(scoreParJoueurEtParCategorie) {
      console.log('mon scoreParJoueurEtParCategorie avant Maj vaut : ');
      console.log(scoreParJoueurEtParCategorie);

      this.scoreUpdated = scoreParJoueurEtParCategorie.scoreCategorie + 1;

      this.s = scoreParJoueurEtParCategorie;
      // this.scoreCategorieAUpdate = new Score(this.s.scoreId, this.s.joueurId, this.s.categorieId, this.s.scoreGlobal, this.scoreUpdated, this.s.nbTentatives);
      this.scoreCategorieAUpdate = new Score(
        scoreParJoueurEtParCategorie.scoreId,
        scoreParJoueurEtParCategorie.joueurId,
        scoreParJoueurEtParCategorie.categorieId,
        scoreParJoueurEtParCategorie.scoreGlobal,
        this.scoreUpdated,
        scoreParJoueurEtParCategorie.nbTentatives);
      console.log('this.scoreCategorieAUpdate vaut : ');
      console.log(this.scoreCategorieAUpdate);
      this.scoreUpdated = this.scoreCategorieAUpdate.scoreCategorie;
      console.log(this.scoreUpdated);
      this.updateScoreCategory(this.scoreCategorieAUpdate);

    }

  updateScoreCategory(scoreToUpdate) {
    this.httpClientService.majScoreCategoryService(scoreToUpdate).subscribe(
      (response: Score) => {
        console.log('Lance majScoreCategoryService');
        // console.log(contenuAnimal);
      },
      (e: any) => console.log(e)
    );
  }

  // *********** MISE A JOUR D'UN ANIMAL *************

  updateAnimalBis(ligne) {
    console.log('Lance updateAnimalBis()');
    console.log('ligne vaut : ');
    console.log(ligne);

    this.httpClientService.majAnimalBisService(ligne).subscribe(
      (contenuAnimal: Quizz) => {
        // console.log('contenuAnimal après modif');
        // console.log(contenuAnimal);
      },
      (e: any) => console.log(e)
    );
  }


  getAllCategorieQuizz(categorieQuizz) {
    console.log('Front-end - getAllCategorieQuizz()');
    console.log('categorieQuizz vaut : ');
    console.log(categorieQuizz);
    this.listCategoriesQuizz = categorieQuizz;

    console.log('this.listCategoriesQuizz vaut : ');
    console.log(this.listCategoriesQuizz);

    console.log('categorieChoisie1 vaut : ');
    console.log(this.listCategoriesQuizz[0]);
    console.log('typeof this.listCategoriesQuizz[0]' + typeof (this.listCategoriesQuizz[0]));

    console.log('this.categorieId');
    console.log(this.categorieId);

    console.log('categorieChoisie2 vaut : ');
  }

  retourneToutesLesCategories() {
    this.httpClientService.getAllCategorieQuizzService().subscribe(
      categorieQuizz => this.getAllCategorieQuizz(categorieQuizz),
    );
  }

  retourneLeContenuDeMaCategorie() {
    this.httpClientService.getContenuCategorieQuizz(this.categorieId).subscribe(
      response => this.returnContenuQuizz(response, this.categorieId),
    );
  }

  onValiderChoix(categorieId) {
    console.log('Lancement onValiderChoix()');
    this.categorieId = categorieId;

    this.getScoreJoueurCategorie(categorieId);
    this.retourneLeContenuDeMaCategorie();
    this.retourneToutesLesCategories();
    console.log(this.categorieChoisie = this.listCategoriesQuizz[this.categorieId].nomCategorie);
    this.retourMenuQuizz = true;
    this.nbTentatives = 0;

    if (this.loginForm.value.motAnglaisJoueur != null) {
      console.log('lance le clear loginForm');
      this.loginForm.value.clear();
    }
  }

  returnContenuQuizz(response, categorieId) {
    console.log('Entre dans returnContenuQuizz : ');
    console.log('response Quizz : ');
    console.log(response);
    console.log('categorieId : ');
    console.log(categorieId);
    this.quizz = response;
  }

  onResetAllCategorieMotTrouve() {
    this.returnContenuQuizz(this.quizz, this.categorieIdChoisie);
    this.motAEteDecouvert = false;
    // console.log('Quizz triés par categorieId vaut : ');
    // console.log(this.quizz);
    for (const ligne of this.quizz) {
      ligne.motTrouve = 'non';
      console.log(ligne);
      this.httpClientService.majAnimalBisService(ligne).subscribe(
        (contenuAnimal: Quizz) => {
          // console.log('contenuAnimal après modif');
          // console.log(contenuAnimal);
        },
        (e: any) => console.log(e)
      );
    }
  }

  retourChoixQuizz() {
    console.log('retourChoixQuizz');
    this.retourMenuQuizz = false;
    return this.retourMenuQuizz;
  }
}
