import { useColors } from "@/hooks/use-colors";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  variant: "gold" | "rose";
  icon: ReactNode;
}

export const Input: React.FC<InputProps> = ({ variant, icon, ...props }) => {
  const { primary, secundary, lightPrimary, lightSecundary } = useColors();

  const goldGradient = [lightPrimary, primary];
  const roseGradient = [lightSecundary, secundary];

  const arrayColors = variant == "gold" ? goldGradient : roseGradient;
  const textColor = variant == "gold" ? "text-black" : "text-white";
  const placeHolderTextColor = variant == "gold" ? "#000" : "#fff";
  return (
    <LinearGradient
      colors={arrayColors}
      style={{
        gap: 8,
      }}
      className="w-[80%] h-[50px] rounded-3xl flex-row items-center px-4  border-white border-2"
    >
      <View>{icon}</View>
      <TextInput
        className={`flex-1 ${textColor}`}
        placeholderTextColor={placeHolderTextColor}
        {...props}
      />
    </LinearGradient>
  );
};
