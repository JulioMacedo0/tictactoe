import { useColors } from "@/hooks/use-colors";
import { View, StyleSheet } from "react-native";
import { TicTacToeButton } from "@/components/tic-tac-button";
import { useState } from "react";
import { Boad } from "@/@types/game";

type TicTacToeProps = {
  playWith: "X" | "O";
  board: Boad;
  setBoad: (value: React.SetStateAction<Boad>) => void;
};

export const TicTacToe = ({ playWith, board, setBoad }: TicTacToeProps) => {
  return (
    <View className="h-[40%] w-[90%] mx-auto mt-8">
      <View
        className="flex-1 bg-white p-1 overflow-hidden"
        style={styles.border}
      >
        <View className="flex-1 flex-row rounded-t-2xl overflow-hidden">
          <TicTacToeButton
            icon={board[1]}
            onPress={() => setBoad((prev) => ({ ...prev, 1: playWith }))}
          />
          <TicTacToeButton
            icon={board[2]}
            onPress={() => setBoad((prev) => ({ ...prev, 2: playWith }))}
          />
          <TicTacToeButton
            icon={board[3]}
            onPress={() => setBoad((prev) => ({ ...prev, 3: playWith }))}
          />
        </View>

        <View className="flex-1  flex-row ">
          <TicTacToeButton
            icon={board[4]}
            onPress={() => setBoad((prev) => ({ ...prev, 4: playWith }))}
          />
          <TicTacToeButton
            icon={board[5]}
            onPress={() => setBoad((prev) => ({ ...prev, 5: playWith }))}
          />
          <TicTacToeButton
            icon={board[6]}
            onPress={() => setBoad((prev) => ({ ...prev, 6: playWith }))}
          />
        </View>

        <View className="flex-1 flex-row rounded-b-2xl overflow-hidden">
          <TicTacToeButton
            icon={board[7]}
            onPress={() => setBoad((prev) => ({ ...prev, 7: playWith }))}
          />
          <TicTacToeButton
            icon={board[8]}
            onPress={() => setBoad((prev) => ({ ...prev, 8: playWith }))}
          />
          <TicTacToeButton
            icon={board[9]}
            onPress={() => setBoad((prev) => ({ ...prev, 9: playWith }))}
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
