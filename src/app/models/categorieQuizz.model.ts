export class CategorieQuizz {
  private _categorieId: number;
  private _nomCategorie: string;


  constructor(categorieId: number, nomCategorie: string) {
    this._categorieId = categorieId;
    this._nomCategorie = nomCategorie;
  }

  get categorieId(): number {
    return this._categorieId;
  }

  set categorieId(value: number) {
    this._categorieId = value;
  }

  get nomCategorie(): string {
    return this._nomCategorie;
  }

  set nomCategorie(value: string) {
    this._nomCategorie = value;
  }
}
