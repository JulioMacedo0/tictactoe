import { Card } from "@/components/card";
import { useAuth } from "@/context/authContext";
import { Link, Stack, Tabs, useRouter } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function ConfigPage() {
  const { logout } = useAuth();
  const navigate = useRouter();
  return (
    <View className=" bg-background flex-1 " style={styles.space}>
      <Card
        text="Logout"
        variant="rose"
        onPress={() => logout()}
        style="mx-auto"
      />
      <Card
        text="Profile"
        variant="rose"
        onPress={() => navigate.push("/profileData")}
        style="mx-auto"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    gap: 15,
  },
});
