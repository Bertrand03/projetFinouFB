import { Component, OnInit } from '@angular/core';
import {CategorieQuizz, HttpClientService, Quizz} from '../service/http-client.service';

@Component({
  selector: 'app-trouve-anglais',
  templateUrl: './trouve-anglais.component.html',
  styleUrls: ['./trouve-anglais.component.scss']
})
export class TrouveAnglaisComponent implements OnInit {

  listEnglishQuizz: Quizz[];
  listCategoriesQuizz: CategorieQuizz[];

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    // this.httpClientService.getAllEnglishQuizzService().subscribe(
    //   response => this.getAllEnglishQuizz(response),
    // );

    this.httpClientService.getAllCategorieQuizzService().subscribe(
      categorieQuizz => this.getAllCategorieQuizz(categorieQuizz),
    );
  }

  // getAllEnglishQuizz(response) {
  //   console.log('Passe dans getAllEnglish()');
  //   this.listEnglishQuizz = response;
  // }

  getAllCategorieQuizz(categorieQuizz) {
    console.log('Front-end - getAllCategorieQuizz()');
    console.log('categorieQuizz vaut : ');
    console.log(categorieQuizz);
    this.listCategoriesQuizz = categorieQuizz;
  }

  onValiderChoix(animauxId) {
    console.log('Lancement onValiderChoix()');
  }
}
