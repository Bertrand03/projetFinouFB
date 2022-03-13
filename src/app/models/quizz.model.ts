export class Quizz {

  public animauxId: number;
  public categorieId: number;
  public motFrancais: string;
  public motAnglais: string;
  public motTrouve: string;
  public tentativeMot: number;


  constructor(animauxId: number, categorieId: number, motFrancais: string, motAnglais: string, motTrouve: string, tentativeMot: number) {
    this.animauxId = animauxId;
    this.categorieId = categorieId;
    this.motFrancais = motFrancais;
    this.motAnglais = motAnglais;
    this.motTrouve = motTrouve;
    this.tentativeMot = tentativeMot;
  }
// GETTERS AND SETTERS A DEFINIR SI BESOIN
}

