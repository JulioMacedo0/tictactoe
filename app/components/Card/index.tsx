import { View, Text } from "react-native";

interface CardProps {}

const Card = () => {
  return (
    <View className="bg-gold w-[80%] h-[50px] rounded-xl justify-center">
      <Text className="text-base text-black text-center font-bold">75</Text>
    </View>
  );
};

export default Card;
