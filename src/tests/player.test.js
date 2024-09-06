import Player from "../modules/player";
import Gameboard from "../modules/gameboard";

describe("Player features", () => {
  let player1;
  let gameboard;
  let testGameboard;

  beforeEach(() => {
    player1 = new Player("Rocky");
  });

  test("Player name", () => {
    expect(player1.name).toBe("Rocky");
  });

  test("Player can attack a gameboard", () => {
    gameboard = new Gameboard();
    testGameboard = new Gameboard();
    testGameboard.receiveAttack(2, 4);
    player1.attack(2, 4, gameboard);
    expect(gameboard).toEqual(testGameboard);
  });
});
