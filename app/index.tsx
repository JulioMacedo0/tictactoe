import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 justify-center items-center">
      <Link href="/login">go to login</Link>
    </View>
  );
}
