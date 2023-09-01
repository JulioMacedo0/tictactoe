import { Board } from "@/@types/game";

export const getWinner = (board: Board): Board | null => {
  const WinnerCondition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (const combination of WinnerCondition) {
    const [a, b, c] = combination;

    if (new Set([board[a], board[b], board[c]]).size == 1) {
      return board[a];
    }
  }

  return null;
};
