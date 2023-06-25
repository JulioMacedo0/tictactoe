import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function Layout() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#0000ff",
  },
});
