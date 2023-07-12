import { useCorlos } from "@/hooks/useColors";
import { Pressable } from "react-native";

interface TicTacToeButtonProps {
  onPress?: () => void;
}

export const TicTacToeButton = ({ onPress }: TicTacToeButtonProps) => {
  const { secundary } = useCorlos();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : null,
          backgroundColor: secundary,
          flex: 1,
        },
      ]}
      onPress={onPress}
    />
  );
};
