import { Component, OnInit } from '@angular/core';
import {HttpClientService, Quizz} from "../service/http-client.service";

@Component({
  selector: 'app-trouve-anglais',
  templateUrl: './trouve-anglais.component.html',
  styleUrls: ['./trouve-anglais.component.scss']
})
export class TrouveAnglaisComponent implements OnInit {

  listEnglishQuizz: Quizz[];

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getAllEnglishQuizzService().subscribe(
      response => this.getAllEnglishQuizz(response),
    );
  }

  getAllEnglishQuizz(response) {
    console.log('Passe dans getAllEnglish()');
    this.listEnglishQuizz = response;
  }
}
