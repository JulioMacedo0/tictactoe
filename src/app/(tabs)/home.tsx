import { View } from "react-native";
import { Profile } from "@components/Profile";
import { Card } from "@components/Card";
import { useRouter } from "expo-router";

export default function HomePage() {
  const navigate = useRouter();
  return (
    <View className="flex-1 items-center bg-background ">
      <Profile imageUrl="https://avatars.githubusercontent.com/u/57598810?v=4" />
      <Card
        variant="rose"
        text="Find Match"
        style="mt-auto"
        onPress={() => navigate.push("/playground/")}
      />
    </View>
  );
}
