import { useColors } from "@/hooks/use-colors";
import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Layout() {
  const { background } = useColors();
  return (
    <Tabs
      screenOptions={{
        headerTitle: "",
        tabBarShowLabel: false,

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
          tabBarIcon: ({ color, focused, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <AntDesign name="bars" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
