export class Quizz {

  public animauxId: number;
  public categorieId: number;
  public motFrancais: string;
  public motAnglais: string;
  public motTrouve: string;
  public aide: string;


  constructor(animauxId: number, categorieId: number, motFrancais: string, motAnglais: string, motTrouve: string, aide: string) {
    this.animauxId = animauxId;
    this.categorieId = categorieId;
    this.motFrancais = motFrancais;
    this.motAnglais = motAnglais;
    this.motTrouve = motTrouve;
    this.aide = aide;
  }
// GETTERS AND SETTERS A DEFINIR SI BESOIN
}

