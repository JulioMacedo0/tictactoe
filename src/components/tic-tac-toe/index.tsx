import { useColors } from "@/hooks/use-colors";
import { View, StyleSheet } from "react-native";
import { TicTacToeButton } from "@/components/tic-tac-button";
import { Game, BoardValue } from "@/@types/game";
import { getTurn } from "@/helpers/get-turn";
import { getWinner } from "@/helpers/get-winner";

type TicTacToeProps = {
  playWith: "X" | "O";
  game: Game;
  winner: boolean;
  setGame: (value: React.SetStateAction<Game>) => void;
  sendGameValues: (
    position: number,
    value: BoardValue,
    turn: BoardValue
  ) => Promise<void>;
};

const ALERT_TURN_MSG = "Its not your turn";

export const TicTacToe = ({
  playWith,
  game,
  setGame,
  sendGameValues,
  winner,
}: TicTacToeProps) => {
  return (
    <View className="h-[40%] w-[90%] mx-auto mt-8">
      <View
        className="flex-1 bg-white p-1 overflow-hidden"
        style={styles.border}
      >
        <View className="flex-1 flex-row rounded-t-2xl overflow-hidden">
          <TicTacToeButton
            icon={game.board[1]}
            onPress={() => {
              if (game.board[1] || winner) return null;
              if (game.turn == playWith) {
                setGame((prev) => ({
                  ...prev,
                  board: { ...prev.board, 1: playWith },
                  turn: getTurn(playWith),
                }));
                sendGameValues(1, playWith, getTurn(playWith));
              } else {
                alert(ALERT_TURN_MSG);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[2]}
            onPress={() => {
              if (game.board[2] || winner) return null;
              if (game.turn == playWith) {
                setGame((prev) => ({
                  ...prev,
                  board: { ...prev.board, 2: playWith },
                  turn: getTurn(playWith),
                }));
                sendGameValues(2, playWith, getTurn(playWith));
              } else {
                alert(ALERT_TURN_MSG);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[3]}
            onPress={() => {
              if (game.board[3] || winner) return null;
              if (game.turn == playWith) {
                setGame((prev) => ({
                  ...prev,
                  board: { ...prev.board, 3: playWith },
                  turn: getTurn(playWith),
                }));
                sendGameValues(3, playWith, getTurn(playWith));
              } else {
                alert(ALERT_TURN_MSG);
              }
            }}
          />
        </View>

        <View className="flex-1  flex-row ">
          <TicTacToeButton
            icon={game.board[4]}
            onPress={() => {
              if (game.board[4] || winner) return null;
              if (game.turn == playWith) {
                setGame((prev) => ({
                  ...prev,
                  board: { ...prev.board, 4: playWith },
                  turn: getTurn(playWith),
                }));
                sendGameValues(4, playWith, getTurn(playWith));
              } else {
                alert(ALERT_TURN_MSG);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[5]}
            onPress={() => {
              if (game.board[5] || winner) return null;
              if (game.turn == playWith) {
                setGame((prev) => ({
                  ...prev,
                  board: { ...prev.board, 5: playWith },
                  turn: getTurn(playWith),
                }));
                sendGameValues(5, playWith, getTurn(playWith));
              } else {
                alert(ALERT_TURN_MSG);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[6]}
            onPress={() => {
              if (game.board[6] || winner) return null;
              if (game.turn == playWith) {
                setGame((prev) => ({
                  ...prev,
                  board: { ...prev.board, 6: playWith },
                  turn: getTurn(playWith),
                }));
                sendGameValues(6, playWith, getTurn(playWith));
              } else {
                alert(ALERT_TURN_MSG);
              }
            }}
          />
        </View>

        <View className="flex-1 flex-row rounded-b-2xl overflow-hidden">
          <TicTacToeButton
            icon={game.board[7]}
            onPress={() => {
              if (game.board[7] || winner) return null;
              if (game.turn == playWith) {
                setGame((prev) => ({
                  ...prev,
                  board: { ...prev.board, 7: playWith },
                  turn: getTurn(playWith),
                }));
                sendGameValues(7, playWith, getTurn(playWith));
              } else {
                alert(ALERT_TURN_MSG);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[8]}
            onPress={() => {
              if (game.board[8] || winner) return null;
              if (game.turn == playWith) {
                setGame((prev) => ({
                  ...prev,
                  board: { ...prev.board, 8: playWith },
                  turn: getTurn(playWith),
                }));
                sendGameValues(8, playWith, getTurn(playWith));
              } else {
                alert(ALERT_TURN_MSG);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[9]}
            onPress={() => {
              if (game.board[9] || winner) return null;
              if (game.turn == playWith) {
                setGame((prev) => ({
                  ...prev,
                  board: { ...prev.board, 9: playWith },
                  turn: getTurn(playWith),
                }));
                sendGameValues(9, playWith, getTurn(playWith));
              } else {
                alert(ALERT_TURN_MSG);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};
const { secundary } = useColors();
const styles = StyleSheet.create({
  border: {
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: secundary,
  },
});
