import { Pressable, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface CardProps {
  className?: string;
  variant: "gold" | "rose";
  text: string;
  onPress?: () => void;
}

const Card = ({ className, variant, text, onPress }: CardProps) => {
  const goldGradient = ["#fdcb5f", "#fda538"];
  const roseGradient = ["#f85577", "#f22551"];

  const arrayColors = variant == "gold" ? goldGradient : roseGradient;
  const textColor = variant == "gold" ? "text-black" : "text-white";
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`w-[80%] h-[50px] rounded-xl overflow-hidden ${className}`}
    >
      <LinearGradient colors={arrayColors} className="flex-1 justify-center">
        <Text className={`text-base text-center font-bold ${textColor}`}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Card;
