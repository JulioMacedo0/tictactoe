import { BoardValue } from "@/@types/game";

export const getTurn = (turn: BoardValue) => {
  if (turn == "X") {
    return "O";
  } else {
    return "X";
  }
};
