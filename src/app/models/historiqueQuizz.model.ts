export class HistoriqueQuizz {
  private _histoQuizzId: number;
  private _name: string;
  private _date: Date;
  private _scoreId: number;


  constructor(histoQuizzId: number, name: string, date: Date, scoreId: number) {
    this._histoQuizzId = histoQuizzId;
    this._name = name;
    this._date = date;
    this._scoreId = scoreId;
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
}
