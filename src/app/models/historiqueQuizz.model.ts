export class HistoriqueQuizz {
  private _histoQuizzId: number;
  private _name: string;
  private _date: Date;
  private _scoreId: number;
  private _sauvegarde: Blob;
  private _joueurId: number;
  private _categorieId: number;


  constructor(histoQuizzId: number, name: string, date: Date, scoreId: number, sauvegarde: Blob, joueurId: number, categorieId: number) {
    this._histoQuizzId = histoQuizzId;
    this._name = name;
    this._date = date;
    this._scoreId = scoreId;
    this._sauvegarde = sauvegarde;
    this._joueurId = joueurId;
    this._categorieId = categorieId;
  }

  get histoQuizzId(): number {
    return this._histoQuizzId;
  }

  set histoQuizzId(value: number) {
    this._histoQuizzId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get scoreId(): number {
    return this._scoreId;
  }

  set scoreId(value: number) {
    this._scoreId = value;
  }

  get sauvegarde(): Blob {
    return this._sauvegarde;
  }

  set sauvegarde(value: Blob) {
    this._sauvegarde = value;
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
