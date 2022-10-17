import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/authService/auth.service';
import {Router} from '@angular/router';
import {HttpClientService} from '../../service/httpClientService/http-client.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScoreService} from '../../service/scoreService/score.service';
import {Joueur} from '../../models/joueur.model';

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
  trouve = false;

  ligneJoueur: Joueur;
  pseudoEnBase: string;
  mdpEnBase: string;

  testValue: number;

  constructor(private authService: AuthService,
              private httpClientService: HttpClientService,
              private scoreService: ScoreService,
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

    if (this.authService.joueur != null) {
      this.trouve = true;
    }

  }

  onSignIn() {
    this.pseudo = this.loginForm.value.pseudoForm;
    this.verifLdap();

  }

  onSignOut() {
    this.pseudo = null;
    this.mdp = null;
    this.trouve = false;
    this.authService.joueurQuiJoue(null);
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
          this.scoreService.getTotalScoreByPlayerService(this.ligneJoueur.id).subscribe(
            value => this.setTotalScoreInScoreService(value)
          );

          // this.router.navigate(['trouve-anglais']);
          // this.router.navigate(['choix-action']);
          this.router.navigate(['choix-quizz']);
        } else {
          if ((this.pseudoEnBase !== this.pseudo) && (this.mdpEnBase === this.mdp)) {
          }
          if ((this.mdpEnBase !== this.mdp) && (this.pseudoEnBase === this.pseudo)) {
            alert('Le mot de passe n\' est pas bon.');
          }
        }
      }
    }
  }

  getListeJoueurs(listeJoueurs) {
    return this.listeJoueurs = listeJoueurs;
  }

  setTotalScoreInScoreService(value) {
    this.testValue = value;
    this.scoreService.setTotalScoreByPlayer(this.testValue);

  }

}
