import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "../../hooks/use-colors";
interface CardProps {
  style?: string;
  variant: "gold" | "rose";
  text: string;
  onPress?: () => void;
  disable?: boolean;
}

export const Card = ({
  style,
  variant,
  text,
  onPress,
  disable = false,
}: CardProps) => {
  const { primary, secundary, lightPrimary, lightSecundary } = useColors();
  const goldGradient = [lightPrimary, primary];
  const roseGradient = [lightSecundary, secundary];

  const arrayColors = variant == "gold" ? goldGradient : roseGradient;
  const textColor = variant == "gold" ? "text-black" : "text-white";
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`w-[80%] h-[50px] rounded-xl overflow-hidden ${style}`}
      disabled={disable}
    >
      <LinearGradient colors={arrayColors} className="flex-1 justify-center">
        <Text className={`text-base text-center font-bold ${textColor}`}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
