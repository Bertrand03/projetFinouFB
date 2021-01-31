import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ToolsBoxService {
  constructor() {}

  upcaseFirstLetterOfSentence(sentence) {
    // console.log('passe dans upcaseFirstLetterOfSentence()');
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    return sentence;
  }
}
