import { View, TouchableOpacity, StyleSheet } from "react-native";

export const TicTacToe = () => {
  return (
    <View className="h-[40%] w-[90%] mx-auto">
      <View className="flex-1 flex-row">
        <TouchableOpacity className="flex-1 bg-secundary border-2 border-white border-dashed"></TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
      </View>

      <View className="flex-1 flex-row">
        <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-secundary border-2 border-white border-dashed"></TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
      </View>
      <View className="flex-1 flex-row">
        <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-secundary"></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    gap: 6,
  },
});
