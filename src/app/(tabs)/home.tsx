import { View } from "react-native";
import { Profile } from "@components/profile";
import { Card } from "@/components/card";
import { useRouter } from "expo-router";

export default function HomePage() {
  const navigate = useRouter();
  return (
    <View className="flex-1 items-center bg-background ">
      <Profile
        imageUrl="https://avatars.githubusercontent.com/u/57598810?v=4"
        userName="Julio Macedo"
      />
      <Card
        variant="rose"
        text="Find Match"
        style="mt-auto mb-4"
        onPress={() => navigate.push("/playground")}
      />
    </View>
  );
}
