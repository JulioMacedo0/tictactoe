import { useCorlos } from "@/hooks/useColors";
import { View, StyleSheet } from "react-native";
import { TicTacToeButton } from "@components/Tic-Tac-Button";

export const TicTacToe = () => {
  return (
    <View className="h-[40%] w-[90%] mx-auto mt-8">
      <View
        className="flex-1 bg-white p-1 overflow-hidden"
        style={styles.border}
      >
        <View className="flex-1 flex-row rounded-t-2xl overflow-hidden">
          <TicTacToeButton onPress={() => console.log("1")} />
          <TicTacToeButton />
          <TicTacToeButton />
        </View>

        <View className="flex-1  flex-row ">
          <TicTacToeButton />
          <TicTacToeButton />
          <TicTacToeButton />
        </View>

        <View className="flex-1 flex-row rounded-b-2xl overflow-hidden">
          <TicTacToeButton />
          <TicTacToeButton />
          <TicTacToeButton />
        </View>
      </View>
    </View>
  );
};
const { secundary } = useCorlos();
const styles = StyleSheet.create({
  border: {
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: secundary,
  },
});
