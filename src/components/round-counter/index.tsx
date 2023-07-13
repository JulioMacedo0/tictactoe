import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCorlos } from "../../hooks/use-colors";
interface RoundCounterProps {
  roundCount: number;
}

export const RoundCounter = ({ roundCount }: RoundCounterProps) => {
  const { gold, lightPrimary } = useCorlos();

  const arrayColors = [lightPrimary, gold];

  return (
    <LinearGradient
      colors={arrayColors}
      className="justify-center rounded-full h-[75px] w-[75px] my-auto"
    >
      <Text className={`text-base text-center font-bold `}>{roundCount}º</Text>
      <Text className={`text-xs text-center font-bold `}>Round</Text>
    </LinearGradient>
  );
};
