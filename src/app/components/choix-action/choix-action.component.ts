import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HistoriqueQuizz} from "../../models/historiqueQuizz.model";
import {Joueur} from "../../models/joueur.model";
import {AuthService} from "../../service/authService/auth.service";
import {HttpClientService} from "../../service/httpClientService/http-client.service";
import {Router} from "@angular/router";
import {Quizz} from "../../models/quizz.model";

@Component({
  selector: 'app-choix-action',
  templateUrl: './choix-action.component.html',
  styleUrls: ['./choix-action.component.scss']
})
export class ChoixActionComponent implements OnInit {

  histoQuizz3LastGames: HistoriqueQuizz[];
  categoryId: number;
  playerId: number;
  histoQuizzIdSelected: number;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router) {
  }

  // @Output() choice: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {
    console.log('categoryId et playerId récupérés du http.client.service valent : ' +
      this.httpClientService.categoryId + ' - ' +
      this.httpClientService.playerId);

    this.categoryId = this.httpClientService.categoryId;
    this.playerId = this.httpClientService.playerId;

    this.getLast3Games();

  }

  onContinue(continueOrNew: string) {
    if (continueOrNew === 'continue') {
      console.log('passe dans onContinue pour continue');
      console.log('savedQuizzSelected vaut : ' + this.histoQuizzIdSelected);
      this.httpClientService.setHistoQuizzIdSelected(this.histoQuizzIdSelected);
      this.router.navigate(['trouve-anglais']);
    } else {
      console.log('passe dans onContinue');
      this.router.navigate(['trouve-anglais']);


      // this.choice.emit('stop');
      this.httpClientService.getNewQuizz(this.categoryId).subscribe(
        (value: Quizz[]) => {
          this.httpClientService.newQuizz = value;
          this.router.navigate(['trouve-anglais']);
        },
        error => { console.log(error)}
      )
    }
  }

  // Méthode qui va permettre de lancer le quizz sélectionné par le joueur
  getLast3Games() {
    console.log('declenche méthode getLast3Games()');
    console.log('this.joueurSelectionne.id vaut ' + this.playerId);
    this.httpClientService.getLast3Games(this.playerId, this.categoryId).subscribe(
      (value: HistoriqueQuizz[]) =>
      {
        this.histoQuizz3LastGames = value;
        this.histoQuizz3LastGames = <HistoriqueQuizz[]> this.histoQuizz3LastGames;
      },
      (error: any) => console.log(error),
      () => {
        console.log('Subscribe getLast3Games() completed');
      }
    );
  }

  returnPreviousMenu() {
    this.router.navigate(['choix-quizz']);
  }

}
