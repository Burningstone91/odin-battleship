import Gameboard from "./gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }

  attack(row, column, gameboard) {
    gameboard.receiveAttack(row, column);
  }
}

export default Player;
