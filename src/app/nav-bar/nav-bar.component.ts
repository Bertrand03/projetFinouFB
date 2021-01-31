import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../service/authService/auth.service';
import {HttpClientService, Joueur, Score} from '../service/http-client.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, DoCheck {

  joueurSelectionne: Joueur;
  scoreParJoueurEtParCategorie: number;
  scoreTotalParJoueur: Score;

  constructor(private authService: AuthService,
              private httpClientService: HttpClientService) {
}

  ngOnInit() {
    // this.httpClientService.getScoreParJoueurEtCategorieQuizz(this.joueurSelectionne.id, 1).subscribe(
    //   resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
    // );

      this.httpClientService.getScoreTotalByJoueur(this.joueurSelectionne).subscribe(
        scoreTotalJoueur => this.resultatScoreTotalParJoueur(scoreTotalJoueur)
      );
  }

  ngDoCheck() {
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();

    // this.httpClientService.getScoreParJoueurEtCategorieQuizz(this.joueurSelectionne.id, 1).subscribe(
    //   resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
    // );
  }

  resultatScoreTotalParJoueur(scoreTotal) {
    this.scoreTotalParJoueur = scoreTotal;
  }

}
