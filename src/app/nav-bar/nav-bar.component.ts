import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {AuthService} from '../service/authService/auth.service';
import {HttpClientService, Joueur, Score} from '../service/httpClientService/http-client.service';
import {ScoreService} from '../service/scoreService/score.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, DoCheck {

  @Input() ligneJoueur: Joueur;
  @Input() hello: string;

  joueurSelectionne: Joueur;
  scoreTotalParJoueur: number;


  constructor(private authService: AuthService,
              private httpClientService: HttpClientService,
              private scoreService: ScoreService) {
}

  ngOnInit() {
      console.log('lance le init navBar');
      this.scoreTotalParJoueur = this.scoreService.totalScoreByPlayer;
      console.log('DANS INIT NAV BAR scoreTotalParJoueur vaut : ' + this.scoreTotalParJoueur);
  }

  test() {
    this.httpClientService.getScoreTotalByJoueur(this.joueurSelectionne.id).subscribe(
      scoreTotalJoueur => this.resultatScoreTotalParJoueur(scoreTotalJoueur)
    );
  }

  ngDoCheck() {
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
    this.scoreTotalParJoueur = this.scoreService.totalScoreByPlayer;
    console.log('DANS DO CHECK NAV BAR scoreTotalParJoueur vaut : ' + this.scoreTotalParJoueur);
  }

  resultatScoreTotalParJoueur(scoreTotal) {
    this.scoreTotalParJoueur = scoreTotal;
    console.log('mon resultatScoreTotalParJoueur vaut : ' + this.scoreTotalParJoueur);
  }

}
