import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function home() {
  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <Link href="/login">go to </Link>
    </View>
  );
}
