import { Card } from "@/components/card";
import { useAuth } from "@/context/authContext";
import { Link, Stack, Tabs } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function ConfigPage() {
  const { logout } = useAuth();
  return (
    <View className=" bg-background flex-1">
      <Card
        text="Logout"
        variant="rose"
        onPress={() => logout()}
        style="mx-auto"
      />
    </View>
  );
}
