import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface CardProps {
  className?: string;
  variant: "gold" | "rose";
}

const Card = ({ className, variant }: CardProps) => {
  const goldGradient = ["#fdcb5f", "#fda538"];
  const roseGradient = ["#f85577", "#f22551"];

  const arrayColors = variant == "gold" ? goldGradient : roseGradient;
  const textColor = variant == "gold" ? "text-black" : "text-white";
  return (
    <LinearGradient
      colors={arrayColors}
      className={`bg-gold w-[80%] h-[50px] rounded-xl justify-center ${className}`}
    >
      <Text className={`text-base text-center font-bold ${textColor}`}>75</Text>
    </LinearGradient>
  );
};

export default Card;
