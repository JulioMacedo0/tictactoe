import { useCorlos } from "@/hooks/useColors";
import { Stack } from "expo-router";

export default function Layout() {
  const { background } = useCorlos();
  return (
    <Stack screenOptions={{ headerShown: false }}>
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
          animation: "fade",
        }}
      />
    </Stack>
  );
}
