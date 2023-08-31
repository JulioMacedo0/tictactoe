export type Game = {
  turn: BoardValue;
  board: Board;
};

export type Board = {
  1: BoardValue;
  2: BoardValue;
  3: BoardValue;
  4: BoardValue;
  5: BoardValue;
  6: BoardValue;
  7: BoardValue;
  8: BoardValue;
};

export type BoardValue = null | "X" | "O";
