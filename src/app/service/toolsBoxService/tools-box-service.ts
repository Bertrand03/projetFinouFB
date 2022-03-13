import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ToolsBoxService {
  constructor() {}

  upcaseFirstLetterOfSentence(sentence) {
    sentence = sentence.trim();
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    return sentence;
  }

  trimAndClean(sentence: string) {
    sentence = sentence.trim();
    sentence = this.upcaseFirstLetterOfSentence(sentence);
    return sentence;
  }
}
