import { Component, OnInit } from '@angular/core';
import {CategorieQuizz} from "../../models/categorieQuizz.model";
import {HttpClientService} from "../../service/httpClientService/http-client.service";
import {AuthService} from "../../service/authService/auth.service";
import {Joueur} from "../../models/joueur.model";
import {ScoreService} from "../../service/scoreService/score.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choix-quizz',
  templateUrl: './choix-quizz.component.html',
  styleUrls: ['./choix-quizz.component.scss']
})
export class ChoixQuizzComponent implements OnInit {

  retourMenuQuizz = false;
  listCategoriesQuizz: CategorieQuizz[];
  categorySelected: boolean;
  categorieId: number;
  categoryChoosed: number;
  joueurSelectionne: Joueur;

  constructor(
    private httpClientService: HttpClientService,
    private authService : AuthService,
    private scoreService: ScoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.httpClientService.getAllCategorieQuizzService().subscribe(
      categorieQuizz => this.getAllCategorieQuizz(categorieQuizz),
    );
  }

  getAllCategorieQuizz(categorieQuizz) {
    this.listCategoriesQuizz = categorieQuizz;
  }

  onValiderChoix(categorieQuizz) {
    console.log('Lancement onValiderChoix() dans choix-quizz component');
    // this.getAllTriesNumberByCategoryId(categorieId);

    // this.categorySelected = true;

    // Suppression des valeurs dans les placeholders
    // this.loginForm.reset();

    this.categorieId = categorieQuizz.categorieId;
    console.log('categorieQuizz vaut : ');
    console.log(categorieQuizz);
    // this.categoryChoosed = categorieQuizz.nomCategorie;

    // this.getScoreJoueurCategorie(categorieId);
    // this.retourneLeContenuDeMaCategorie();
    // this.retourneToutesLesCategories();

    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
    // console.log(this.categorieChoisie = this.listCategoriesQuizz[this.categorieId].nomCategorie);
    // this.retourMenuQuizz = true;
    // this.nbTentatives = 0;
    // if (this.categorieId != null && this.joueurSelectionne.id != null) {
    //   this.scoreService.getScoreByCategoryAndPlayerService(this.categorieId, this.joueurSelectionne.id).subscribe(
    //     resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
    //   );
    // }
    // this.gethisto();
    // this.getLast3Games();

    this.httpClientService.setCategoryChoosed(this.joueurSelectionne.id, categorieQuizz);
    return this.router.navigate(['choix-action']);

  }
}
