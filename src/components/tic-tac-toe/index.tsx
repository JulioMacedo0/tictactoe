import { useColors } from "@/hooks/use-colors";
import { View, StyleSheet } from "react-native";
import { TicTacToeButton } from "@/components/tic-tac-button";
import { Game, BoardValue } from "@/@types/game";
import { getTurn } from "@/helpers/get-turn";

type TicTacToeProps = {
  playWith: "X" | "O";
  game: Game;
  setGame: (value: React.SetStateAction<Game>) => void;
  sendEvent: (
    position: number,
    value: BoardValue,
    turn: BoardValue
  ) => Promise<void>;
};

const alertTurMessage = "Its not your turn";

export const TicTacToe = ({
  playWith,
  game,
  setGame,
  sendEvent,
}: TicTacToeProps) => {
  console.log(game.board[1]);
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
              if (game.turn == playWith) {
                setGame((prev) => ({ ...prev, 1: playWith }));
                sendEvent(1, playWith, getTurn(playWith));
              } else {
                alert(alertTurMessage);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[2]}
            onPress={() => {
              if (game.turn == playWith) {
                setGame((prev) => ({ ...prev, 2: playWith }));
                sendEvent(2, playWith, getTurn(playWith));
              } else {
                alert(alertTurMessage);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[3]}
            onPress={() => {
              if (game.turn == playWith) {
                setGame((prev) => ({ ...prev, 3: playWith }));
                sendEvent(3, playWith, getTurn(playWith));
              } else {
                alert(alertTurMessage);
              }
            }}
          />
        </View>

        <View className="flex-1  flex-row ">
          <TicTacToeButton
            icon={game.board[4]}
            onPress={() => {
              if (game.turn == playWith) {
                setGame((prev) => ({ ...prev, 4: playWith }));
                sendEvent(4, playWith, getTurn(playWith));
              } else {
                alert(alertTurMessage);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[5]}
            onPress={() => {
              if (game.turn == playWith) {
                setGame((prev) => ({ ...prev, 5: playWith }));
                sendEvent(5, playWith, getTurn(playWith));
              } else {
                alert(alertTurMessage);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[6]}
            onPress={() => {
              if (game.turn == playWith) {
                setGame((prev) => ({ ...prev, 6: playWith }));
                sendEvent(6, playWith, getTurn(playWith));
              } else {
                alert(alertTurMessage);
              }
            }}
          />
        </View>

        <View className="flex-1 flex-row rounded-b-2xl overflow-hidden">
          <TicTacToeButton
            icon={game.board[7]}
            onPress={() => {
              if (game.turn == playWith) {
                setGame((prev) => ({ ...prev, 7: playWith }));
                sendEvent(7, playWith, getTurn(playWith));
              } else {
                alert(alertTurMessage);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[8]}
            onPress={() => {
              if (game.turn == playWith) {
                setGame((prev) => ({ ...prev, 8: playWith }));
                sendEvent(8, playWith, getTurn(playWith));
              } else {
                alert(alertTurMessage);
              }
            }}
          />
          <TicTacToeButton
            icon={game.board[9]}
            onPress={() => {
              if (game.turn == playWith) {
                setGame((prev) => ({ ...prev, 9: playWith }));
                sendEvent(9, playWith, getTurn(playWith));
              } else {
                alert(alertTurMessage);
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
