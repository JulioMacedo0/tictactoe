import { StyleSheet, View, Text } from "react-native";
import Profile from "../components/Profile";
import Card from "../components/Card";

export default function HomePage() {
  return (
    <View className="flex-1 items-center bg-background">
      <Profile imageUrl="https://avatars.githubusercontent.com/u/57598810?v=4" />
      <Card variant="gold" />
    </View>
  );
}
