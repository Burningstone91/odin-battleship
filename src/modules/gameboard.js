const SIZE = 10;

class Gameboard {
  constructor() {
    this.board = [];
    this.shots = [];
    this.init();
  }

  init() {
    for (let i = 0; i < SIZE; i++) {
      this.board[i] = [];
      this.shots[i] = [];
      for (let j = 0; j < SIZE; j++) {
        this.board[i][j] = null;
        this.shots[i][j] = false;
      }
    }
  }

  placeShip(ship, row, column) {
    if (!this.isPlaceFree(ship, row, column)) return false;

    for (let i = 0; i < ship.length; i++) {
      this.board[row][column + i] = ship;
    }
  }

  receiveAttack(row, column) {
    if (this.isCellShot(row, column)) return false;

    const shipHit = this.board[row][column];
    if (shipHit) shipHit.hit();

    this.shots[row][column] = true;
  }

  isPlaceFree(ship, row, column) {
    for (let i = 0; i < ship.length; i++) {
      if (this.board[row][column + 1]) return false;
    }
    return true;
  }

  isFieldOccupied(row, column) {
    return this.board[row][column];
  }

  isCellShot(row, column) {
    return this.shots[row][column];
  }

  allShipsSunk() {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.board[i][j] && this.shots[i][j] === false) return false;
      }
    }
    return true;
  }
}

export default Gameboard;
