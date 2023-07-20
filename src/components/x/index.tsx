import { useColors } from "@/hooks/use-colors";
import { Entypo } from "@expo/vector-icons";

interface XProps {
  size: number;
}
export const X = ({ size }: XProps) => {
  const { gold } = useColors();
  return <Entypo name="cross" size={size} color={gold} />;
};
