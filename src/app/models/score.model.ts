export class Score {
  public scoreId: number;
  public joueurId: number;
  public categorieId: number;
  public scoreGlobal: number;
  public scoreCategorie: number;
  public nbTentatives: number;


  constructor(scoreId: number, joueurId: number, categorieId: number, scoreGlobal: number, scoreCategorie: number, nbTentatives: number) {
    this.scoreId = scoreId;
    this.joueurId = joueurId;
    this.categorieId = categorieId;
    this.scoreGlobal = scoreGlobal;
    this.scoreCategorie = scoreCategorie;
    this.nbTentatives = nbTentatives;
  }

  getScoreId(): number {
    return this.scoreId;
  }
  //
  setScoreId(value: number) {
    this.scoreId = value;
  }

  getJoueurId(): number {
    return this.joueurId;
  }

  setJoueurId(value: number) {
    this.joueurId = value;
  }

  getCategorieId(): number {
    return this.categorieId;
  }

  setCategorieId(value: number) {
    this.categorieId = value;
  }

  getScoreGlobal(): number {
    return this.scoreGlobal;
  }

  setScoreGlobal(value: number) {
    this.scoreGlobal = value;
  }

  getScoreCategorie(): number {
    return this.scoreCategorie;
  }

  setScoreCategorie(value: number) {
    this.scoreCategorie = value;
  }

  getNbTentatives(): number {
    return this.nbTentatives;
  }

  setNbTentatives(value: number) {
    this.nbTentatives = value;
  }
}

