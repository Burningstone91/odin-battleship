import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

describe("Gameboard features", () => {
  let gameboard;
  let ship;
  let fieldsArray;
  let shotsArray;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship("Cruiser", 4);
    fieldsArray = [];
    shotsArray = [];

    for (let i = 0; i < 10; i++) {
      fieldsArray[i] = [];
      shotsArray[i] = [];
      for (let j = 0; j < 10; j++) {
        fieldsArray[i][j] = null;
        shotsArray[i][j] = false;
      }
    }
  });

  test("Initialize gameboard", () => {
    expect(gameboard).toEqual({
      board: fieldsArray,
      shots: shotsArray,
    });
  });

  test("Place a ship", () => {
    gameboard.placeShip(ship, 3, 4);
    fieldsArray[3][4] = ship;
    fieldsArray[3][5] = ship;
    fieldsArray[3][6] = ship;
    fieldsArray[3][7] = ship;
    expect(gameboard).toEqual({
      board: fieldsArray,
      shots: shotsArray,
    });
  });

  test("Reject colliding ships", () => {
    gameboard.placeShip(ship, 3, 4);
    expect(gameboard.placeShip(ship, 3, 5)).toBe(false);
  });

  test("Receive an attack", () => {
    gameboard.receiveAttack(3, 5);
    shotsArray[3][5] = true;
    expect(gameboard).toEqual({
      board: fieldsArray,
      shots: shotsArray,
    });
  });

  test("Reject attack on same field twice", () => {
    gameboard.receiveAttack(3, 5);
    expect(gameboard.receiveAttack(3, 5)).toBe(false);
  });

  test("Hit a ship", () => {
    gameboard.placeShip(ship, 3, 4);
    gameboard.receiveAttack(3, 5);
    expect(ship.hits).toBe(1);
  });

  test("Sink a ship", () => {
    gameboard.placeShip(ship, 3, 4);
    gameboard.receiveAttack(3, 4);
    gameboard.receiveAttack(3, 5);
    gameboard.receiveAttack(3, 6);
    gameboard.receiveAttack(3, 7);
    expect(ship.isSunk()).toBe(true);
  });

  test("All ships sunken", () => {
    gameboard.placeShip(ship, 3, 4);
    gameboard.placeShip(ship, 4, 4);
    gameboard.receiveAttack(3, 4);
    gameboard.receiveAttack(3, 5);
    gameboard.receiveAttack(3, 6);
    gameboard.receiveAttack(3, 7);
    gameboard.receiveAttack(4, 4);
    gameboard.receiveAttack(4, 5);
    gameboard.receiveAttack(4, 6);
    gameboard.receiveAttack(4, 7);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
