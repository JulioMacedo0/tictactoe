import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useColors } from "@hooks/use-colors";
import React, { useState } from "react";
import { Card } from "@/components/card";
import { Input } from "@/components/Input";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";
import LottieView from "lottie-react-native";

export default function Login() {
  const route = useRouter();
  const { login, loading } = useAuth();
  const { primary, secundary } = useColors();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <LinearGradient
      colors={[primary, secundary]}
      className="flex-1 items-center justify-center"
      style={{
        gap: 12,
      }}
    >
      <StatusBar style="light" />
      <View className="h-60 w-60">
        <LottieView
          source={require("@lotties/XO_animeted.json")}
          autoPlay
          loop={false}
        />
      </View>

      <Input
        icon={<MaterialIcons name="email" size={24} color="white" />}
        variant="rose"
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        icon={<Octicons name="key" size={24} color="white" />}
        variant="rose"
        placeholder="Password"
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Card
        text={loading ? "Loading..." : "Log in"}
        variant="gold"
        onPress={() => login(email, password)}
      />
      <View className="flex-row ">
        <Text className="text-white text-base ">Don't have an account?</Text>
        <TouchableOpacity onPress={() => route.replace("/register")}>
          <Text className="text-primary text-base "> Sign up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
