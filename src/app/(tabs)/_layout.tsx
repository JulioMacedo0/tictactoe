import { useColors } from "@/hooks/use-colors";
import { Tabs } from "expo-router";

export default function Layout() {
  const { background } = useColors();
  return (
    <Tabs
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          backgroundColor: background,
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
