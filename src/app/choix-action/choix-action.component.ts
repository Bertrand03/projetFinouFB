import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from '../service/http-client.service';

@Component({
  selector: 'app-choix-action',
  templateUrl: './choix-action.component.html',
  styleUrls: ['./choix-action.component.scss']
})
export class ChoixActionComponent implements OnInit {

  loginForm: FormGroup;
  reponseChoix: string;
  url: string;
  choix: string[];


  constructor(private fb: FormBuilder, private httpClient: HttpClient, private httpClientService: HttpClientService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
        choixAction: []
  });

    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    console.log('response : ');
    console.log(response);
    this.choix = response;
  }

  trouveParId() {
    this.reponseChoix = this.loginForm.value.choixAction;
    console.log('reponseChoix : ' + this.reponseChoix);
    this.url = 'http://localhost:5366/quizzs/' + this.reponseChoix;
    console.log('url dans component : ' + this.url);
    this.httpClientService.getId(this.url);
    return this.httpClient.get(this.url);
  }

}
