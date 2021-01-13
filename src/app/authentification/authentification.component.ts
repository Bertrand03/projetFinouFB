import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/authService/auth.service';
import {Router} from '@angular/router';
import {HttpClientService, Joueur} from '../service/http-client.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  pseudo: string;
  mdp: string;
  listeJoueurs: Joueur [];
  ldap: Joueur [];
  loginForm: FormGroup;
  trouve: boolean;

  ligneJoueur: Joueur;
  pseudoEnBase: string;
  mdpEnBase: string;

  constructor(private authService: AuthService,
              private httpClientService: HttpClientService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      pseudoForm: [],
      mdpForm: []
    });

    this.httpClientService.getJoueurs().subscribe(
      listeJoueurs => this.getListeJoueurs(listeJoueurs)
    );

  }

  // onSignIn() {
  //   this.pseudo = this.loginForm.value.pseudoForm;
  //   console.log('le pseudo rentré vaut : ');
  //   console.log(this.pseudo);
  //   this.authService.checkAuth(this.pseudo)
  //     .then(() => {
  //       // this.router.navigate(['app-choix-action']);
  //       this.verifLdap();
  //     }, (err) => {
  //       this.errorMsg = err;
  //     });
  // }

  onSignIn() {
    this.pseudo = this.loginForm.value.pseudoForm;
    console.log('le pseudo rentré vaut : ');
    console.log(this.pseudo);
    // this.authService.checkAuth(this.pseudo);
    this.verifLdap();
  }

  verifLdap() {
    this.ldap = this.listeJoueurs;
    this.pseudo = this.loginForm.value.pseudoForm;
    this.mdp = this.loginForm.value.mdpForm;

    this.trouve = false;

    for (let i = 0; i < this.ldap.length; i++) {
      if (!this.trouve) {
        this.ligneJoueur = this.ldap[i];
        this.pseudoEnBase = this.ligneJoueur.pseudo;
        this.mdpEnBase = this.ligneJoueur.motDePasse;
        if ((this.ligneJoueur.pseudo === this.pseudo) && (this.ligneJoueur.motDePasse === this.mdp)) {
          this.trouve = true;
          this.authService.joueurQuiJoue(this.ldap[i]);
          this.router.navigate(['trouve-anglais']);
          console.log('navigate mot anglais');
        } else {
          console.log('ldap faux');
          if ((this.pseudoEnBase !== this.pseudo) && (this.mdpEnBase === this.mdp)) {
            console.log('pseudoEnBase vaut : ' + this.pseudoEnBase);
            console.log('pseudo vaut : ' + this.pseudo);
            alert('Le pseudo n\' est pas bon.');
          }
          if ((this.mdpEnBase !== this.mdp) && (this.pseudoEnBase === this.pseudo)) {
            console.log('mdpEnBase vaut : ' + this.mdpEnBase);
            console.log('mdp vaut : ' + this.mdp);
            alert('Le mot de passe n\' est pas bon.');
          }
        }
      }
    }
  }

  getListeJoueurs(listeJoueurs) {
    return this.listeJoueurs = listeJoueurs;
  }

}
