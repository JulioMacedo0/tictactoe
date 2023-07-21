import { useColors } from "@/hooks/use-colors";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  variant: "gold" | "rose";
}

export const Input: React.FC<InputProps> = ({ variant, ...props }) => {
  const { primary, secundary, lightPrimary, lightSecundary } = useColors();

  const goldGradient = [lightPrimary, primary];
  const roseGradient = [lightSecundary, secundary];

  const arrayColors = variant == "gold" ? goldGradient : roseGradient;
  const textColor = variant == "gold" ? "text-black" : "text-white";
  const placeHolderTextColor = variant == "gold" ? "#000" : "#fff";
  return (
    <LinearGradient
      colors={arrayColors}
      className="w-[80%] h-[50px] rounded-xl"
    >
      <TextInput
        className={`flex-1 px-4 ${textColor}`}
        placeholderTextColor={placeHolderTextColor}
        {...props}
      />
    </LinearGradient>
  );
};
