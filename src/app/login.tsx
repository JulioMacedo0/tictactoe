import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useColors } from "@hooks/use-colors";
import React, { useState } from "react";
import { supabase } from "@/supabase/init";
import { Card } from "@/components/card";
import { Input } from "@/components/Input";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";

export default function Login() {
  const route = useRouter();

  const { primary, secundary } = useColors();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function login() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    console.log(error);
    if (!error && !data.user) {
      setLoading(false);
      alert("Check your email for the login link!");
    }
    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }
  return (
    <LinearGradient
      colors={[primary, secundary]}
      className="flex-1 items-center justify-center"
      style={{
        gap: 12,
      }}
    >
      <StatusBar style="light" />

      <Input
        icon={<MaterialIcons name="email" size={24} color="white" />}
        variant="rose"
        placeholder="Enter your email"
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        icon={<Octicons name="key" size={24} color="white" />}
        variant="rose"
        placeholder="Enter your password"
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Card
        text={loading ? "Loading..." : "Log in"}
        variant="gold"
        onPress={login}
      />
      <View className="flex-row ">
        <Text className="text-white text-base ">Dont have account?</Text>
        <TouchableOpacity onPress={() => route.replace("/register")}>
          <Text className="text-primary text-base "> Click here</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
