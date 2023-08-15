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
import {Router} from "@angular/router";

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
  categoryChoosed: CategorieQuizz;
  loginForm: FormGroup;
  motAnglaisSaisi: string;
  categorieId: number;
  retourMenuQuizz = false;
  nbTentatives: number;
  deserialized: Quizz[];
  quizzAAfficher: Quizz[];

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
  histoQuizzObs: any[];

  histoQuizzIdSelected: number;

  quizzNameSaved: string;


  constructor(private httpClientService: HttpClientService,
              private authService: AuthService,
              private toolsBoxService: ToolsBoxService,
              private scoreService: ScoreService,
              private quizzService: QuizzService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.categoryChoosed = this.httpClientService.category;

    // Récupération du histoQuizzId pour afficher le Quizz sauvegardé sélectionné par le joueur
    this.histoQuizzIdSelected = this.httpClientService.histoQuizzIdSelected;
    console.log('histoQuizzIdSelected vaut : ' + this.histoQuizzIdSelected);

    // Regarde si on lance un nouveau quizz ou si on reprend un quizz existant
    if (this.histoQuizzIdSelected != null) {
      console.log('histoQuizzIdSelected est défini et vaut : ' + this.histoQuizzIdSelected);
      this.deserialize();
      console.log('lance this.deserialize()');
    } else {
      console.log('histoQuizzIdSelected est undefined, c\'est un new Quizz');
      this.httpClientService.getNewQuizz(this.categoryChoosed.categorieId).subscribe(
        (value: Quizz[]) => this.quizzAAfficher = value
      );
      console.log('deserialized vaut : ');
      console.log(this.deserialized);
    }
    this.listQuizzToSave = this.quizzAAfficher;

    this.httpClientService.getAllCategorieQuizzService().subscribe(
      categorieQuizz => this.getAllCategorieQuizz(categorieQuizz),
    );

    this.loginForm = this.formBuilder.group({
        motAnglaisJoueur: [],
        quizzNameSaved: [],
        savedGameChoosed: []
      }
    );
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
    console.log('categoryId et playerId récupérés du http.client.service valent : ' +
    this.httpClientService.categoryId + ' ' +
    this.httpClientService.playerId);

    this.startNewQuizzOrContinue = null;
    this.categorySelected = null;

    this.getWordsWithErrors();

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
    // this.getLast3Games();
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

  deserialize() {
    this.quizzService.deserializeHistoQuizzByHistoQuizzId(this.httpClientService.histoQuizzIdSelected).subscribe((value: Quizz[]) => {
    this.quizzAAfficher = value;
    console.log('subscribe deserialized OK');
    console.log('value vaut : ');
    console.log(value);
    });
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
    console.log('lance onValiderQuizz()');

    console.log('this.listQuizzToSave vaut : ');
    console.log(this.listQuizzToSave);

    // v2
    this.histoQuizzObs = [this.listQuizzToSave,this.quizzNameSaved, this.joueurSelectionne.id, this.httpClientService.categoryId];
    console.log('dans trouve anglais component histoQuizzObs vaut : ');
    console.log(this.histoQuizzObs);
    this.quizzService.savePlayerQuizzV2(this.histoQuizzObs).subscribe(() => {
      }
    );
  }

    onControlFrenchWord(ligne, index) {
    this.listQuizzToSave = this.quizzAAfficher;
    console.log('index vaut : ' + index);
    console.log('listQuizzToSave vaut : ');
    console.log(this.listQuizzToSave);
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

      this.listQuizzToSave[index] = ligne;
      console.log('On ajoute la ligne');
      console.log(ligne);
      console.log(' à listQuizzToSave qui maintenant vaut : ');
      console.log(this.listQuizzToSave);
    }

    updateScoreByCategory(ligne) {
      this.scoreService.getScoreByCategoryAndPlayerService(ligne.categorieId, this.joueurSelectionne.id).subscribe(
        resultat => this.incrementOnePointCategoryScore(resultat)
      );

    }

    helpMaxHideBlock(motTrouveOui, ligne, index) {
      console.log('Passe dans helpMaxHideBlock, motTrouveOui vaut : ' + motTrouveOui);
      console.log('ligne vaut : ');
      console.log(ligne);
      console.log('passe la valeur mot trouve a oui');
      console.log(ligne.motTrouve = 'oui');
      this.onControlFrenchWord(ligne, index);
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

      this.retourneLeContenuDeMaCategorie();
      this.retourneToutesLesCategories();

      this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
      this.retourMenuQuizz = true;
      this.nbTentatives = 0;
      if (this.categorieId != null && this.joueurSelectionne.id != null) {
        this.scoreService.getScoreByCategoryAndPlayerService(this.categorieId, this.joueurSelectionne.id).subscribe(
          resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
        );
      }
    }

    returnContenuQuizz(response, categorieId) {
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
        this.quizzService.updateQuizzWord(ligne).subscribe(
          (contenuAnimal: Quizz) => {
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
      // return this.retourMenuQuizz;
      return this.router.navigate(['choix-quizz']);
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

