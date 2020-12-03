import { Component, OnInit } from '@angular/core';
import {CategorieQuizz, HttpClientService, Quizz} from '../service/http-client.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-trouve-anglais',
  templateUrl: './trouve-anglais.component.html',
  styleUrls: ['./trouve-anglais.component.scss']
})
export class TrouveAnglaisComponent implements OnInit {

  listCategoriesQuizz: CategorieQuizz[];
  quizz: Quizz[];
  categorieIdChoisie: number;
  categorieChoisie: string;
  loginForm: FormGroup;
  motAnglaisSaisi: string;
  categorieId: number;

  constructor(private httpClientService: HttpClientService,
              private  httpClient: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.httpClientService.getAllCategorieQuizzService().subscribe(
      categorieQuizz => this.getAllCategorieQuizz(categorieQuizz),
    );

    this.loginForm = this.formBuilder.group({
        motAnglaisJoueur: [],
      }
    );
  }

  onControlFrenchWord(ligne) {
    console.log('On entre dans onControlFrenchWord');
    console.log('ma ligne vaut :');
    console.log(ligne);
    this.motAnglaisSaisi = this.loginForm.value.motAnglaisJoueur;
    console.log('this.motAnglaisSaisi vaut : ' + this.motAnglaisSaisi);
    console.log('ligne.motTrouve vaut : ' + ligne.motTrouve);

    this.afterControlFrenchWord(ligne, this.motAnglaisSaisi);
  }

  afterControlFrenchWord(ligne, motAnglaisSaisi) {
    console.log('On entre dans afterControlFrenchWord');
    console.log('ligne.motAnglais : ');
    console.log(ligne.motAnglais);
    console.log('motAnglaisSaisi : ');
    console.log(motAnglaisSaisi);
    if (motAnglaisSaisi === ligne.motAnglais) {
      console.log('mot trouvé');
      ligne.motTrouve = 'oui';
      this.updateAnimalBis(ligne);
    } else {
      console.log('mauvais mot');
    }
  }

  // *********** MISE A JOUR D'UN ANIMAL *************

  updateAnimalBis(ligne) {
    console.log('Lance updateAnimalBis()');
    console.log('ligne vaut : ');
    console.log(ligne);

    this.httpClientService.majAnimalBisService(ligne).subscribe(
      (contenuAnimal: Quizz) => {
        console.log('contenuAnimal après modif');
        console.log(contenuAnimal);
      },
      (e: any) => console.log(e)
    );
  }


  getAllCategorieQuizz(categorieQuizz) {
    console.log('Front-end - getAllCategorieQuizz()');
    console.log('categorieQuizz vaut : ');
    console.log(categorieQuizz);
    this.listCategoriesQuizz = categorieQuizz;

    console.log('this.listCategoriesQuizz vaut : ');
    console.log(this.listCategoriesQuizz);

    // this.categorieChoisie = this.listCategoriesQuizz[this.categorieId].nomCategorie;
    // this.categorieChoisie = this.listCategoriesQuizz[0];
    console.log('categorieChoisie1 vaut : ');
    console.log(this.listCategoriesQuizz[0]);
    console.log('typeof this.listCategoriesQuizz[0]' + typeof (this.listCategoriesQuizz[0]));

    console.log('this.categorieId');
    console.log(this.categorieId);

    console.log('categorieChoisie2 vaut : ');
    // console.log(this.categorieChoisie = this.listCategoriesQuizz[this.categorieId].nomCategorie);
    // console.log(this.categorieChoisie = this.listCategoriesQuizz[this.categorieId].nomCategorie);

  }



  onValiderChoix(categorieId) {
    console.log('Lancement onValiderChoix()');
    console.log('categorieId vaut : ');
    console.log(categorieId);
    this.categorieId = categorieId;
    console.log('this.categorieId : ' );
    console.log(this.categorieId);
    this.httpClientService.getContenuCategorieQuizz(categorieId).subscribe(
      response => this.returnContenuQuizz(response, categorieId),
    );

    this.httpClientService.getAllCategorieQuizzService().subscribe(
      categorieQuizz => this.getAllCategorieQuizz(categorieQuizz),
    );
    console.log(this.categorieChoisie = this.listCategoriesQuizz[this.categorieId].nomCategorie);

  }

  returnContenuQuizz(response, categorieId) {
    console.log('Entre dans returnContenuQuizz : ');
    console.log('response Quizz : ');
    console.log(response);
    console.log('categorieId : ');
    console.log(categorieId);
    this.quizz = response;
  }

  onResetAllCategorieMotTrouve() {
    this.returnContenuQuizz(this.quizz, this.categorieIdChoisie);
    console.log('Quizz triés par categorieId vaut : ');
    console.log(this.quizz);
    for (const ligne of this.quizz) {
      ligne.motTrouve = 'non';
      console.log(ligne);
      this.httpClientService.majAnimalBisService(ligne).subscribe(
        (contenuAnimal: Quizz) => {
          console.log('contenuAnimal après modif');
          console.log(contenuAnimal);
        },
        (e: any) => console.log(e)
      );
    }
  }
}
