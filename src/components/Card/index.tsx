import { Pressable, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCorlos } from "../../hooks/useColors";
interface CardProps {
  style?: string;
  variant: "gold" | "rose";
  text: string;
  onPress?: () => void;
}

export const Card = ({ style, variant, text, onPress }: CardProps) => {
  const { primary, secundary, lightPrimary, lightSecundary } = useCorlos();
  const goldGradient = [lightPrimary, primary];
  const roseGradient = [lightSecundary, secundary];

  const arrayColors = variant == "gold" ? goldGradient : roseGradient;
  const textColor = variant == "gold" ? "text-black" : "text-white";
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`w-[80%] h-[50px] rounded-xl overflow-hidden ${style}`}
    >
      <LinearGradient colors={arrayColors} className="flex-1 justify-center">
        <Text className={`text-base text-center font-bold ${textColor}`}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
