import { useColors } from "@/hooks/use-colors";
import { Pressable } from "react-native";
import { X } from "../x";
import { O } from "../o";

interface TicTacToeButtonProps {
  onPress?: () => void;
  icon: "X" | "O" | null;
}

export const TicTacToeButton = ({ onPress, icon }: TicTacToeButtonProps) => {
  const { secundary } = useColors();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : null,
          backgroundColor: secundary,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      onPress={onPress}
    >
      {icon == "X" ? <X size={100} /> : icon == "O" ? <O size={80} /> : null}
    </Pressable>
  );
};
