import { TicTacToe } from "@/components/Tic-Tac-Toe";
import { View, Text } from "react-native";

function PlayGround() {
  return (
    <View className="flex-1 bg-background">
      <TicTacToe />
    </View>
  );
}

export default PlayGround;
