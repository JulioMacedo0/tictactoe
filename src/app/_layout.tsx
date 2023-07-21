import { useColors } from "@/hooks/use-colors";
import { Stack } from "expo-router";

export default function Layout() {
  const { background } = useColors();
  return (
    <Stack
      screenOptions={{
        animation: "fade",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="playground"
        options={{
          headerShown: true,
          title: "Online Game",
          headerStyle: {
            backgroundColor: background,
          },
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          animation: "fade_from_bottom",
          animationDuration: 300,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animation: "fade_from_bottom",
          animationDuration: 300,
        }}
      />
    </Stack>
  );
}
