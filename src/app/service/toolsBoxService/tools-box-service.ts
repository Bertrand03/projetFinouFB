import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ToolsBoxService {
  constructor() {}

  upcaseFirstLetterOfSentence(sentence) {
    console.log('passe dans upcaseFirstLetterOfSentence()');
    console.log(' avant sentence vaut : ' + sentence);
    sentence = sentence.trim();
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    console.log(' apres sentence vaut : ' + sentence);
    return sentence;
  }

  trimAndClean(sentence: string) {
    sentence = sentence.trim();
    sentence = this.upcaseFirstLetterOfSentence(sentence);
    return sentence;
  }
}
