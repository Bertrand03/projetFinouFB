import { Injectable } from '@angular/core';
import {HttpClientService, Joueur} from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean;
  joueurs: Joueur;

  constructor(private httpClientService: HttpClientService) {
  }

  checkAuth(pseudo) {

    this.httpClientService.getJoueurs().subscribe(
      listeJoueurs => this.maMethode(listeJoueurs),
    );
    console.log('pseudo vaut : ');
    console.log(pseudo);
    // console.log('this.joueurs.pseudo) vaut : ');
    // console.log(this.joueurs.pseudo);

    return new Promise(
      (res, rej) => {
        setTimeout(
          () => {
            // If credentials not equel reject the promise
            if (this.joueurs.pseudo !== pseudo) {
              rej('Ce pseudo n\'existe pas');
            }

            // Else just call the signIn function
            console.log('Authentification OK');
            this.signIn(res);
          }, 1000
        );
      }
    );

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
    console.log('response Joueurs: ');
    console.log(listeJoueurs);
    this.joueurs = listeJoueurs;
  }
}
