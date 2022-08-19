import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClientService} from '../../service/httpClientService/http-client.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../service/authService/auth.service';
import {ToolsBoxService} from '../../service/toolsBoxService/tools-box-service';
import {ScoreService} from '../../service/scoreService/score.service';
import {Quizz} from '../../models/quizz.model';
import {Score} from '../../models/score.model';
import {CategorieQuizz} from '../../models/categorieQuizz.model';
import {Joueur} from '../../models/joueur.model';
import {QuizzService} from "../../service/quizzService/quizz.service";
import {HistoQuizzObs} from "../../models/histoQuizzObs.model";
import {HistoriqueQuizz} from "../../models/historiqueQuizz.model";

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
  categoryChoosed: string;
  loginForm: FormGroup;
  motAnglaisSaisi: string;
  categorieId: number;
  retourMenuQuizz = false;
  nbTentatives: number;

  joueurSelectionne: Joueur;
  scoreParJoueurEtParCategorie: Score;
  scoreCategorieAUpdate: Score;
  scoreCateg: number;

  motQuizz: any;
  wordsWithErrors: Quizz[];

  goReset: boolean = false;
  startNewQuizzOrContinue: boolean = null;
  categorySelected: boolean = null;
  doCheck: boolean = false;

  listQuizzToSave: Quizz[];
  historiqueQuizz: Object[];
  infosHistoriqueQuizzToSave: any[];
  histoQuizzObs: any[];
  histoQuizz: HistoriqueQuizz;

  quizzNameSaved: string;

  b: Blob;

  constructor(private httpClientService: HttpClientService,
              private authService: AuthService,
              private toolsBoxService: ToolsBoxService,
              private scoreService: ScoreService,
              private quizzService: QuizzService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.httpClientService.getAllCategorieQuizzService().subscribe(
      categorieQuizz => this.getAllCategorieQuizz(categorieQuizz),
    );


    this.loginForm = this.formBuilder.group({
        motAnglaisJoueur: [],
        quizzNameSaved: []
      }
    );
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
    this.startNewQuizzOrContinue = null;
    this.categorySelected = null;

    this.getWordsWithErrors();

    this.gethisto();
  }

  ngDoCheck() {
    if (this.doCheck == true) {
      console.log('passe dans doCheck');
      this.getWordsWithErrors();

    }
    this.doCheck = false;
  }

  continueOrNot(event) {
    console.log('declenche méthode test');
    console.log('avant test event vaut ' + event);
    event == 'continue' ? this.startNewQuizzOrContinue = true : this.startNewQuizzOrContinue = false;
    console.log('apres test startNewQuizzOrContinue vaut ' + this.startNewQuizzOrContinue);
    if (this.startNewQuizzOrContinue == false) {
      this.onResetAllCategorieMotTrouve();
      // TODO Inclure la remise à zéro du Score categ
    }
    console.log('nbTentatives =  ' + this.nbTentatives);

  }

  gethisto() {
    this.httpClientService.getHistoriqueQuizz().subscribe(
      (value: Object[]) => this.historiqueQuizz = value)
    console.log(' historiqueQuizz vaut :');
    console.log(this.historiqueQuizz);
    ;
  }

  getAllTriesNumberByCategoryId(categoryId) {
    console.log('lance getAllTriesNumberByCategoryId()');
    this.quizzService.getAllTriesNumberByCategoryId(categoryId).subscribe((value: number) =>
      this.nbTentatives = value
    );
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
    console.log('scoreTotal');
    console.log(scoreTotal);
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
    this.scoreCateg = resultat.scoreCategorie;
    console.log('scoreCateg vaut : ' + this.scoreCateg);

  }

  // ***** SERIALISATION *****


  onValiderQuizz() {
    // On sauvegarde le quizz dans un fichier
    this.quizzNameSaved = this.loginForm.value.quizzNameSaved;
    console.log('quizzNameSaved vaut : ' + this.quizzNameSaved);
    console.clear();
    console.log('lance onValiderQuizz()');
    this.quizzService.getAllDatas(this.joueurSelectionne.id, this.categorieId).subscribe(
      (value: Quizz[]) => {
        this.listQuizzToSave = value;
        this.infosHistoriqueQuizzToSave = [this.quizzNameSaved, this.joueurSelectionne.id, this.categorieId];
        var myArray = [];
        myArray.push(this.infosHistoriqueQuizzToSave);
        myArray.push(this.listQuizzToSave);
        console.log('contenu du tableau myArray : ');
        console.log(myArray);

        // v1
        // this.quizzService.savePlayerQuizz(this.listQuizzToSave, this.quizzNameSaved).subscribe(() => {
        //   console.log('passe dans savePlayerQuizz');
        // });

        // v2
        this.histoQuizzObs = [this.listQuizzToSave,this.quizzNameSaved, this.joueurSelectionne.id, this.categorieId];
        console.log('dans trouve anglais component histoQuizzObs vaut : ');
        console.log(this.histoQuizzObs);
        this.quizzService.savePlayerQuizzV2(this.histoQuizzObs).subscribe(() => {
          }
        )
      }
    );
  }

  // savePlayerQuizz() {
  //   this.quizzService.savePlayerQuizz(this.joueurSelectionne.id, this.categorySelected).subscribe(() => {
  //     console.log('est passé dans onValiderQuizz()')
  //   });
  // }

    onControlFrenchWord(ligne) {
      this.motAnglaisSaisi = this.loginForm.value.motAnglaisJoueur;

      // Premiere lettre en majuscule
      this.motAnglaisSaisi = this.toolsBoxService.upcaseFirstLetterOfSentence(this.motAnglaisSaisi);

      // Si mot a été trouvé
      if (this.motAnglaisSaisi === ligne.motAnglais) {
        ligne.motTrouve = 'oui';
        this.updateScoreByCategory(ligne);
      } else {
        // Si mot n'a pas été trouvé, ne rien faire pour l'instant
        this.doCheck = true;

      }
      ligne.tentativeMot++;
      // this.getWordsWithErrors();
      this.quizzService.updateQuizzWord(ligne).subscribe(() => this.getAllTriesNumberByCategoryId(this.categorieId));
      // this.updateGlobalScore();
    }

    updateScoreByCategory(ligne) {
      this.scoreService.getScoreByCategoryAndPlayerService(ligne.categorieId, this.joueurSelectionne.id).subscribe(
        resultat => this.incrementOnePointCategoryScore(resultat)
      );

    }

    incrementOnePointCategoryScore(scoreParJoueurEtParCategorie) {
      console.log('lance updateCategoryScore');
      console.log('scoreParJoueurEtParCategorie vaut ');
      console.log(scoreParJoueurEtParCategorie);
      this.scoreCategorieAUpdate = new Score(
        scoreParJoueurEtParCategorie.scoreId,
        scoreParJoueurEtParCategorie.joueurId,
        scoreParJoueurEtParCategorie.categorieId,
        scoreParJoueurEtParCategorie.scoreGlobal,
        this.scoreCateg + 1,
        scoreParJoueurEtParCategorie.nbTentatives);
      this.updateScoreCategory(this.scoreCategorieAUpdate);
    }

    updateScoreCategory(scoreToUpdate)
    {
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

    getAllCategorieQuizz(categorieQuizz)
    {
      this.listCategoriesQuizz = categorieQuizz;
    }

    retourneToutesLesCategories()
    {
      this.httpClientService.getAllCategorieQuizzService().subscribe(
        (categorieQuizz: CategorieQuizz[]) => this.listCategoriesQuizz = categorieQuizz
      );
    }

    retourneLeContenuDeMaCategorie()
    {
      this.httpClientService.getContenuCategorieQuizz(this.categorieId).subscribe(
        // response => this.returnContenuQuizz(response, this.categorieId)
        (resultat: Quizz[]) => this.quizz = resultat
      );
    }

    onValiderChoix(categorieId, categorieQuizz)
    {
      console.log('Lancement onValiderChoix()');
      this.getAllTriesNumberByCategoryId(categorieId);

      this.categorySelected = true;

      // Suppression des valeurs dans les placeholders
      this.loginForm.reset();

      this.categorieId = categorieQuizz.categorieId;
      this.categoryChoosed = categorieQuizz.nomCategorie;

      // this.getScoreJoueurCategorie(categorieId);
      this.retourneLeContenuDeMaCategorie();
      this.retourneToutesLesCategories();

      this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
      // console.log(this.categorieChoisie = this.listCategoriesQuizz[this.categorieId].nomCategorie);
      this.retourMenuQuizz = true;
      this.nbTentatives = 0;
      if (this.categorieId != null && this.joueurSelectionne.id != null) {
        this.scoreService.getScoreByCategoryAndPlayerService(this.categorieId, this.joueurSelectionne.id).subscribe(
          resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
        );
      }
      this.gethisto();
    }

    returnContenuQuizz(response, categorieId)
    {
      // console.log('Entre dans returnContenuQuizz : ');
      // console.log('response Quizz : ');
      // console.log(response);
      // console.log('categorieId : ');
      // console.log(categorieId);
      this.quizz = response;
    }

    onResetAllCategorieMotTrouve()
    {
      console.log('onResetAllCategorieMotTrouve');
      this.loginForm.reset();
      if (this.goReset) {
        this.goReset = false;
      } else {
        this.goReset = true;
      }
      this.returnContenuQuizz(this.quizz, this.categorieIdChoisie);
      console.log('Quizz triés par categorieId vaut : ');
      console.log(this.quizz);
      for (const ligne of this.quizz) {
        ligne.motTrouve = 'non';
        ligne.tentativeMot = 0;
        // console.log(ligne);
        this.quizzService.updateQuizzWord(ligne).subscribe(
          (contenuAnimal: Quizz) => {
            // console.log('contenuAnimal après modif');
            // console.log(contenuAnimal);
            this.quizzService.getAllTriesNumberByCategoryId(ligne.categorieId).subscribe((value: number) =>
              this.nbTentatives = value);
          },
          (e: any) => console.log(e)
        );
      }
    }

    retourChoixQuizz()
    {
      this.retourMenuQuizz = false;
      this.startNewQuizzOrContinue = null;
      this.categorySelected = false;
      alert('Etes vous sûr de vouloir quitter le quizz sans l\'enregistrer ?');
      return this.retourMenuQuizz;
    }

    getQuizzWord(wordId)
    {
      this.quizzService.getQuizzWord(wordId).subscribe((value: Quizz) => this.motQuizz = value);
    }

    getWordsWithErrors() {
      this.quizzService.getAllWordsWithTries().subscribe((value: Quizz[]) =>
        this.wordsWithErrors = value)
    }

  }

