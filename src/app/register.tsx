import { StatusBar } from "expo-status-bar";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useColors } from "@hooks/use-colors";
import { useState } from "react";
import { supabase } from "@/supabase/init";
import { Card } from "@/components/card";
import { Input } from "@/components/Input";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";

export default function Register() {
  const route = useRouter();

  const { primary, secundary } = useColors();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function register() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

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
        icon={<Feather name="user" size={24} color="white" />}
        variant="rose"
        placeholder="Player name"
        value={userName}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(text) => setUserName(text)}
      />

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
        text={loading ? "Loading..." : "Create account"}
        variant="gold"
        onPress={register}
      />
      <View className="flex-row ">
        <Text className="text-white text-base "> have account?</Text>
        <TouchableOpacity onPress={() => route.replace("/login")}>
          <Text className="text-primary text-base "> Click here</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
