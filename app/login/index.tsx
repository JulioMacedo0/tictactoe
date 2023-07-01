import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  return (
    <LinearGradient
      colors={["#fb832c", "#fb4764"]}
      className="flex-1 items-center justify-center "
    >
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          header: () => null,
        }}
      />
      <Text className="text-white text-4xl mb-8">Tic Tac </Text>

      <TouchableOpacity className="bg-white  w-[60%] px-4 py-2 rounded-full ">
        <Text className="text-black text-center text-lg font-bold ">
          sig in
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
