// import { useCorlos } from "../hooks/useColors";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCorlos } from "../hooks/useColors";

export default function Login() {
  const route = useRouter();

  const { primary, secundary } = useCorlos();
  return (
    <LinearGradient
      colors={[primary, secundary]}
      className="flex-1 items-center justify-center "
    >
      <StatusBar style="light" />

      <Text className="text-white text-4xl mb-8">Tic Tac </Text>

      <TouchableOpacity
        className="bg-white  w-[60%] px-4 py-2 rounded-full"
        onPress={() => route.replace("home")}
      >
        <Text className="text-black text-center text-lg font-bold ">
          sig in
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
