import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="playground/index"
        options={{
          headerShown: true,
          title: "Online Game",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
        }}
      />
    </Stack>
  );
}
