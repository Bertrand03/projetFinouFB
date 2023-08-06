import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.scss']
})
export class AideComponent implements OnInit, DoCheck{

  @Input () englishWord: string;
  @Input () resetHelpAndPenalty: boolean;
  @Input () wordFound: string;
  @Input () nbOfTries: number;
  englishWordToFind: string;
  indexEnglishWordToFind = 0;
  penaltyPoints = 0;
  maxIndex = 0;
  displayHelpButton = true;


  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    //
  }
  //
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('LANCE ONCHANGES QUAND RESET');
  //   if (changes.resetHelpAndPenalty) {
  //     this.englishWordToFind = '';
  //     this.penaltyPoints = 0;
  //     this.indexEnglishWordToFind = 0;
  //   }
  // }

  onDisplayOneLetter(englishWordToFind) {
    this.maxIndex = englishWordToFind.length;
    this.indexEnglishWordToFind++;
    if (this.indexEnglishWordToFind <= this.maxIndex) {
      this.englishWordToFind = englishWordToFind.substring(0, this.indexEnglishWordToFind);
      this.giveOnePenaltyPoint(englishWordToFind, this.indexEnglishWordToFind);
      if (this.indexEnglishWordToFind == this.maxIndex) this.displayHelpButton = false;
    }
  }

  giveOnePenaltyPoint(englishWordToFind, index) {
    if (index <= englishWordToFind.length) {
      this.penaltyPoints++;
    }
  }
}
