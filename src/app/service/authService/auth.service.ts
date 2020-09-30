import { Injectable } from '@angular/core';
import {HttpClientService, Joueur} from '../http-client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean;
  joueurs: Joueur;
  // listeJoueurs: any[];

  constructor(private httpClientService: HttpClientService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  checkAuth(pseudo) {
    console.log('On entre dans authService.checkAuth()');
    this.httpClientService.getJoueurs().subscribe(
      listeJoueurs => this.maMethode(listeJoueurs),
    );
    console.log('pseudo vaut : ');
    console.log(pseudo);

    return this.router.navigate(['app-choix-action']);
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

  maMethode(listeJoueurs) {
    console.log('Entre dans ma méthode() : ');
    console.log('listeJoueurs: ');
    console.log(listeJoueurs);
    this.joueurs = listeJoueurs;
  }
}
