import { View, Text } from "react-native";
import { useNavigation } from "expo-router";

function PlayGround() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-background">
      <Text>Play</Text>
    </View>
  );
}

export default PlayGround;
