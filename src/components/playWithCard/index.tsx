import { View } from "react-native";
import { O } from "@components/o";
import { X } from "@components/x";

interface PlayWithCardProps {
  size: number;
  type: "O" | "X";
}
export const PlayWithCard = ({ size, type }: PlayWithCardProps) => {
  return (
    <View className="bg-secundary rounded-2xl h-[60px] w-[60px] mt-2 justify-center items-center">
      {type == "X" ? <X size={size} /> : <O size={size} />}
    </View>
  );
};
