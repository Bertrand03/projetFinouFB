import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

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
  redBoldLine = false;

  @Output() monOutput = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    //
  }

  onDisplayOneLetter(englishWordToFind) {
    this.maxIndex = englishWordToFind.length;
    this.indexEnglishWordToFind++;
    if (this.indexEnglishWordToFind <= this.maxIndex) {
      this.englishWordToFind = englishWordToFind.substring(0, this.indexEnglishWordToFind);
      this.giveOnePenaltyPoint(englishWordToFind, this.indexEnglishWordToFind);
      if (this.indexEnglishWordToFind == this.maxIndex) {
        this.displayHelpButton = false;
        this.redBoldLine = true;
        this.monOutput.emit('oui');
      }
    }
  }

  giveOnePenaltyPoint(englishWordToFind, index) {
    if (index <= englishWordToFind.length) {
      this.penaltyPoints++;
    }
  }
}
