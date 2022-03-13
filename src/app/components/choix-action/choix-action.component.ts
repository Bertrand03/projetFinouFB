import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-choix-action',
  templateUrl: './choix-action.component.html',
  styleUrls: ['./choix-action.component.scss']
})
export class ChoixActionComponent implements OnInit {
  //


  @Output() choice: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {
  }

  onContinue(continueOrNew: string) {
    if (continueOrNew == 'continue') {
      console.log('passe dans onContinue pour continue');
      this.choice.emit('continue'); // On envoie dans le composant parent la valeur 'continue'
    } else {
      console.log('passe dans onContinue pour stop');
      this.choice.emit('stop');
    }
  }



}
