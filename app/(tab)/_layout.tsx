import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fb832c",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen name="home" />
    </Tabs>
  );
}
