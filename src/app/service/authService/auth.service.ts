import { Injectable } from '@angular/core';
import {HttpClientService, Joueur} from '../http-client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean;
  pseudo: string;
  joueur: Joueur;

  constructor(private httpClientService: HttpClientService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  joueurQuiJoue(joueur) {
    // console.log('joueur qui joue : ');
    // console.log(joueur);
    this.joueur = joueur;
  }

  retourneJoueurQuiJoue() {
    // console.log('retourneJoueurQuiJoue : ');
    // console.log(this.joueur);
    return this.joueur;
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
