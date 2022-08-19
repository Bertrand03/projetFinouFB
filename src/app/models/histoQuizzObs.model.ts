export class HistoQuizzObs {

  private _quizzName: string;
  private _joueurId: number;
  private _categorieId: number;


  constructor(quizzName: string, joueurId: number, categorieId: number) {
    this._quizzName = quizzName;
    this._joueurId = joueurId;
    this._categorieId = categorieId;
  }


  get quizzName(): string {
    return this._quizzName;
  }

  set quizzName(value: string) {
    this._quizzName = value;
  }

  get joueurId(): number {
    return this._joueurId;
  }

  set joueurId(value: number) {
    this._joueurId = value;
  }

  get categorieId(): number {
    return this._categorieId;
  }

  set categorieId(value: number) {
    this._categorieId = value;
  }
}

