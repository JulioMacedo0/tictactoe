import { useColors } from "@/hooks/use-colors";
import { Octicons } from "@expo/vector-icons";

interface OProps {
  size: number;
}
export const O = ({ size }: OProps) => {
  return <Octicons name="circle" size={size} color="#fff" />;
};
