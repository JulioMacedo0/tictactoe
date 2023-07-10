import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#fee4ea",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen name="history" />
    </Tabs>
  );
}
