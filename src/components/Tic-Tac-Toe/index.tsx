import { View, TouchableOpacity, StyleSheet } from "react-native";

export const TicTacToe = () => {
  return (
    <View className="h-[40%] w-[90%] mx-auto mt-8 ">
      <View className="flex-1 bg-white rounded-2xl p-1 border-2 border-secundary border-dashed">
        <View className="flex-1 flex-row ">
          <TouchableOpacity className="flex-1 bg-secundary rounded-tl-2xl"></TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-secundary rounded-tr-3xl"></TouchableOpacity>
        </View>

        <View className="flex-1 flex-row">
          <TouchableOpacity className="flex-1 bg-secundary "></TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-secundary "></TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
        </View>
        <View className="flex-1 flex-row">
          <TouchableOpacity className="flex-1 bg-secundary rounded-bl-2xl"></TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-secundary rounded-br-2xl"></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    gap: 6,
  },
});
