import { View, Text } from "react-native";
import { useNavigation } from "expo-router";
import Card from "../components/Card";

function PlayGround() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-background">
      <Text>PlayGround</Text>
      <Card
        text="Change"
        variant="gold"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
      />
    </View>
  );
}

export default PlayGround;
