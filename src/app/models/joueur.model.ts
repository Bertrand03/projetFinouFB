export class Joueur {
  private _id: number;
  private _pseudo: string;
  private _motDePasse: string;


  constructor(id: number, pseudo: string, motDePasse: string) {
    this._id = id;
    this._pseudo = pseudo;
    this._motDePasse = motDePasse;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  set pseudo(value: string) {
    this._pseudo = value;
  }

  get motDePasse(): string {
    return this._motDePasse;
  }

  set motDePasse(value: string) {
    this._motDePasse = value;
  }
}
