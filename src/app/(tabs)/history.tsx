import { Link, Stack, Tabs } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
export default function HistoryPage() {
  return (
    <View className="bg-background  flex-1">
      <View className="h-80 w-80 mx-auto  ">
        <LottieView source={require("@lotties/comming_soon.json")} autoPlay />
      </View>
    </View>
  );
}
