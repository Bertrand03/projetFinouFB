import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../service/authService/auth.service';
import {HttpClientService, Joueur} from '../service/http-client.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, DoCheck {

  joueurSelectionne: Joueur;
  scoreParJoueurEtParCategorie: number;

  constructor(private authService: AuthService,
              private httpClientService: HttpClientService) {
}

  ngOnInit() {
    // this.httpClientService.getScoreParJoueurEtCategorieQuizz(this.joueurSelectionne.id, 1).subscribe(
    //   resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
    // );
  }

  ngDoCheck() {
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();

    // this.httpClientService.getScoreParJoueurEtCategorieQuizz(this.joueurSelectionne.id, 1).subscribe(
    //   resultat => this.resultatGetScoreParJoueurEtCategorieQuizz(resultat)
    // );
  }

  // resultatGetScoreParJoueurEtCategorieQuizz(resultat) {
  //   this.scoreParJoueurEtParCategorie = resultat;
  // }

}
