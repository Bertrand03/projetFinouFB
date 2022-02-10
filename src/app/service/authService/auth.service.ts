import { Injectable } from '@angular/core';
import {HttpClientService} from '../httpClientService/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Joueur} from '../../models/joueur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean;
  pseudo: string;
  joueur: Joueur;

  scoreJoueur: number;

  constructor(private httpClientService: HttpClientService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  joueurQuiJoue(joueur) {
    // console.log('joueur qui joue : ');
    // console.log(joueur);
    this.joueur = joueur;
    console.log('lance getScoreTotalByJoueur() avant le routing');
    if (this.joueur != null) {
      this.httpClientService.getScoreTotalByJoueur(this.joueur.id).subscribe(
        value => this.retourneScoreJoueurQuiJoue(value)
      );
    }
  }

  getScoreTotalByJoueur(joueurId) {
    this.httpClientService.getScoreTotalByJoueur(joueurId).subscribe(
      value => this.retourneScoreJoueurQuiJoue(value)
    );
  }

  retourneJoueurQuiJoue() {
    // console.log('retourneJoueurQuiJoue : ');
    // console.log(this.joueur);
    return this.joueur;
  }

  retourneScoreJoueurQuiJoue(value) {
    this.scoreJoueur = value;
    return this.scoreJoueur;
  }


  /**
   * Method for sign in a user
   * @param res The response to return
   */
  signIn(res) {
    this.isAuth = true;
    res(true);
  }

  /**
   * Method for sign out a user
   */
  signOut() {
    this.isAuth = false;
  }


}
