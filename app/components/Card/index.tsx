import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface CardProps {
  className?: string;
}

const Card = ({ className }: CardProps) => {
  return (
    <LinearGradient
      colors={["#fdcb5f", "#fda538"]}
      className={`bg-gold w-[80%] h-[50px] rounded-xl justify-center ${className}`}
    >
      <Text className="text-base text-black text-center font-bold">75</Text>
    </LinearGradient>
  );
};

export default Card;
