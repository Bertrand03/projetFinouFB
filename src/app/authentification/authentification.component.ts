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
  errorMsg: string;
  joueurs: Joueur;
  loginForm: FormGroup;
  test = 'monTest';

  constructor(private authService: AuthService,
              private httpClientService: HttpClientService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      pseudoForm: []
    });
  }

  onSignIn() {
    this.pseudo = this.loginForm.value.pseudoForm;
    console.log('le pseudo rentré vaut : ');
    console.log(this.pseudo);
    this.authService.checkAuth(this.pseudo)
      .then(() => {
        this.router.navigate(['app-choix-action']);
      }, (err) => {
        this.errorMsg = err;
      });
  }

  onVerifTest() {
    console.log('Test vaut : ');
    console.log(this.test);
  }
}
