import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import {CategorieQuizz, HttpClientService, Joueur, Quizz, Score} from '../service/httpClientService/http-client.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../service/authService/auth.service';
import {ToolsBoxService} from '../service/toolsBoxService/tools-box-service';
import {ScoreService} from '../service/scoreService/score.service';

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
  motAEteDecouvert: boolean;

  joueurSelectionne: Joueur;
  scoreParJoueurEtParCategorie: Score;
  scoreCategorieAUpdate: Score;
  scoreCateg: number;

  help: string;

  constructor(private httpClientService: HttpClientService,
              private authService: AuthService,
              private toolsBoxService: ToolsBoxService,
              private scoreService: ScoreService,
              private httpClient: HttpClient,
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
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
    this.motAEteDecouvert = false;
  }

  ngDoCheck() {
    //
  }

  updateGlobalScore() {
    console.log('lance updateGlobalScore()');
    // this.httpClientService.getScoreTotalByJoueur(this.joueurSelectionne.id).subscribe(
    this.scoreService.getTotalScoreByPlayerService(this.joueurSelectionne.id).subscribe(
      scoreTotalJoueur => this.resultatScoreTotalParJoueur(scoreTotalJoueur)
    );
  }

  getScoreTotalParJoueur() {
    console.log('On recupere le score global');
    this.httpClientService.getScoreTotalByJoueur(this.joueurSelectionne.id).subscribe(
      (scoreTotal => this.resultatScoreTotalParJoueur(scoreTotal)
      )
    );
  }

  resultatScoreTotalParJoueur(scoreTotal) {
    console.log('on stocke le score global');
    this.scoreService.totalScoreByPlayer = scoreTotal;
    // this.scoreTotalParJoueurId = this.scoreTotalParJoueur.scoreGlobal;
    console.log('this.scoreService.totalScoreByPlayer vaut ' + this.scoreService.totalScoreByPlayer);
    // console.log('scoreTotal vaut ' + scoreTotal);
  }

  resultatGetScoreParJoueurEtCategorieQuizz(resultat) {
    console.log('LANCE resultatGetScoreParJoueurEtCategorieQuizz');
    this.scoreParJoueurEtParCategorie = resultat;
    console.log('resultat vaut : ' + resultat);
    this.scoreCateg =  resultat.scoreCategorie;
    console.log('scoreCateg vaut : ' + this.scoreCateg);

  }

  onControlFrenchWord(ligne) {
    console.log('On entre dans onControlFrenchWord');
    this.motAEteDecouvert = false;
    this.motAnglaisSaisi = this.loginForm.value.motAnglaisJoueur;

    // Premiere lettre en majuscule
    this.motAnglaisSaisi = this.toolsBoxService.upcaseFirstLetterOfSentence(this.motAnglaisSaisi);

    // Si mot a été trouvé
    if (this.motAnglaisSaisi === ligne.motAnglais) {
      ligne.motTrouve = 'oui';
      this.motAEteDecouvert = true;
      this.updateScoreByCategory(ligne);
      this.updateAnimalBis(ligne);
    } else { // Si mot n'a pas été trouvé
      console.log('mauvais mot');
    }
    this.compteurTentatives();
    // this.updateGlobalScore();
  }

    compteurTentatives() {
      this.nbTentatives ++;
      this.monOutput.emit(this.nbTentatives);
      // console.log('nbTentatives vaut : ' + this.nbTentatives);
    }


    updateScoreByCategory(ligne) {
      this.scoreService.getScoreByCategoryAndPlayerService(ligne.categorieId, this.joueurSelectionne.id).subscribe(
        resultat => this.incrementOnePointCategoryScore(resultat)
      );

    }

    incrementOnePointCategoryScore(scoreParJoueurEtParCategorie) {
      console.log('lance updateCategoryScore');
      this.scoreCategorieAUpdate = new Score(
        scoreParJoueurEtParCategorie.scoreId,
        scoreParJoueurEtParCategorie.joueurId,
        scoreParJoueurEtParCategorie.categorieId,
        scoreParJoueurEtParCategorie.scoreGlobal,
        this.scoreCateg + 1,
        scoreParJoueurEtParCategorie.nbTentatives);
      this.updateScoreCategory(this.scoreCategorieAUpdate);
    }

  updateScoreCategory(scoreToUpdate) {
    this.scoreService.updateScoreByCategoryAndPlayer(scoreToUpdate).subscribe(
      () => {
        console.log('On met à jour le score categorie');
        console.log('scoreToUpdate : ');
        console.log(scoreToUpdate);
        console.log('this.scoreCateg : ' + this.scoreCateg);
        this.scoreCateg = scoreToUpdate.scoreCategorie;
        console.log('this.scoreCateg : ' + this.scoreCateg);
        this.updateGlobalScore();
      },
      (e: any) => console.log(e)
    );
  }

  // *********** MISE A JOUR D'UN ANIMAL *************

  updateAnimalBis(ligne) {
    console.log('Lance updateAnimalBis()');
    // console.log('ligne vaut : ');
    // console.log(ligne);

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

    // this.getScoreJoueurCategorie(categorieId);
    this.retourneLeContenuDeMaCategorie();
    this.retourneToutesLesCategories();

    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
    // console.log(this.categorieChoisie = this.listCategoriesQuizz[this.categorieId].nomCategorie);
    this.retourMenuQuizz = true;
    this.nbTentatives = 0;
    console.log('AVANT REQUETE');
    if (this.categorieId != null && this.joueurSelectionne.id != null) {
      console.log('if this.categorieId != null && this.joueurSelectionne.id != null');
      this.scoreService.getScoreByCategoryAndPlayerService(this.categorieId, this.joueurSelectionne.id).subscribe(
        resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
      );
    }
  }

  returnContenuQuizz(response, categorieId) {
    // console.log('Entre dans returnContenuQuizz : ');
    // console.log('response Quizz : ');
    // console.log(response);
    // console.log('categorieId : ');
    // console.log(categorieId);
    this.quizz = response;
  }

  onResetAllCategorieMotTrouve() {
    this.returnContenuQuizz(this.quizz, this.categorieIdChoisie);
    this.motAEteDecouvert = false;
    // console.log('Quizz triés par categorieId vaut : ');
    // console.log(this.quizz);
    for (const ligne of this.quizz) {
      ligne.motTrouve = 'non';
      // console.log(ligne);
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
    // console.log('retourChoixQuizz');
    this.retourMenuQuizz = false;
    return this.retourMenuQuizz;
  }

  onAide(englishWordToFind) {
    this.help = englishWordToFind.substring(0, 1);
  }
}
