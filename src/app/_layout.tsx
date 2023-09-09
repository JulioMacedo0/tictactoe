import { Provider, useAuth } from "@/context/authContext";
import { useColors } from "@/hooks/use-colors";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  return (
    <Provider>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const { background } = useColors();
  const { authInitialized, user } = useAuth();

  if (!authInitialized && !user) return null;

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
        name="(auth)/login"
        options={{
          animation: "fade_from_bottom",
          animationDuration: 300,
        }}
      />
      <Stack.Screen
        name="(auth)/register"
        options={{
          animation: "fade_from_bottom",
          animationDuration: 300,
        }}
      />

      <Stack.Screen
        name="profileData"
        options={{
          headerShown: true,
          animation: "fade_from_bottom",
          animationDuration: 300,
        }}
      />
    </Stack>
  );
}
