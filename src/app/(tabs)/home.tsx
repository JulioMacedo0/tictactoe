import { View } from "react-native";
import { Profile } from "@components/profile";
import { Card } from "@/components/card";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

export default function HomePage() {
  const navigate = useRouter();
  const { user } = useAuth();
  console.log(user.user_metadata);
  return (
    <View className="flex-1 items-center bg-background ">
      <Profile
        imageUrl={user?.user_metadata.userPicture}
        userName={`${user?.user_metadata.username}`}
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
