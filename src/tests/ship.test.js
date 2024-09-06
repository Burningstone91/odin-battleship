import Ship from "../modules/ship";

describe("Ship features", () => {
  let submarine;

  beforeEach(() => {
    submarine = new Ship("Submarine", 3);
  });

  test("Ship has been hit", () => {
    submarine.hit();
    expect(submarine.hits).toBe(1);
  });

  test("Ship has been hit twice", () => {
    submarine.hit();
    submarine.hit();
    expect(submarine.hits).toBe(2);
  });

  test("Ship is not sunk", () => {
    submarine.hit();
    submarine.hit();
    expect(submarine.isSunk()).toBe(false);
  });

  test("Ship is sunk", () => {
    submarine.hit();
    submarine.hit();
    submarine.hit();
    expect(submarine.isSunk()).toBe(true);
  });
});
