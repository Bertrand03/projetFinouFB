import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.scss']
})
export class AideComponent implements OnInit, DoCheck, OnChanges{

  @Input () englishWord: string;
  @Input () resetHelpAndPenalty: boolean;
  @Input () wordFound: string;
  englishWordToFind: string;
  indexEnglishWordToFind = 0;
  penaltyPoints = 0;


  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    //
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('LANCE ONCHANGES');
    if (changes.resetHelpAndPenalty) {
      this.englishWordToFind = '';
      this.penaltyPoints = 0;
      this.indexEnglishWordToFind = 0;
    }
  }

  onDisplayOneLetter(englishWordToFind) {
    this.indexEnglishWordToFind++;
    this.englishWordToFind = englishWordToFind.substring(0, this.indexEnglishWordToFind);
    this.giveOnePenaltyPoint(englishWordToFind, this.indexEnglishWordToFind);
  }

  giveOnePenaltyPoint(englishWordToFind, index) {
    if (index <= englishWordToFind.length) {
      this.penaltyPoints++;
    }
  }
}
