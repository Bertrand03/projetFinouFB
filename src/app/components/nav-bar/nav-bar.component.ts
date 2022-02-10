import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {AuthService} from '../../service/authService/auth.service';
import {HttpClientService} from '../../service/httpClientService/http-client.service';
import {ScoreService} from '../../service/scoreService/score.service';
import {Joueur} from '../../models/joueur.model';

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
      this.scoreTotalParJoueur = this.scoreService.totalScoreByPlayer;
  }

  ngDoCheck() {
    this.joueurSelectionne = this.authService.retourneJoueurQuiJoue();
    this.scoreTotalParJoueur = this.scoreService.totalScoreByPlayer;
  }
}
