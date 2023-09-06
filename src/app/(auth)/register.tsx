import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useColors } from "@hooks/use-colors";
import { useState } from "react";
import { Card } from "@/components/card";
import { Input } from "@/components/Input";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";
import LottieView from "lottie-react-native";
import { colors } from "@/themes/colors";

export default function Register() {
  const { primary, secundary } = useColors();
  const { createAcount, loading } = useAuth();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  return (
    <LinearGradient
      colors={[primary, secundary]}
      className="flex-1 items-center justify-center"
      style={{
        gap: 12,
      }}
    >
      <StatusBar style="light" />
      <View className="h-48 w-48 items-center mb-4">
        <View className="h-40 w-40 ">
          <LottieView
            source={require("@lotties/profile.json")}
            autoPlay
            colorFilters={[
              { keypath: "circle", color: colors.secundary },
              { keypath: "body", color: colors.secundary },
              { keypath: "head", color: colors.secundary },
              { keypath: "+", color: "#fff" },
            ]}
            loop={false}
          />
        </View>

        <Card
          style="absolute bottom-1"
          text="Upload your photo"
          variant="gold"
          onPress={() => console.log("upload")}
        />
      </View>
      <Input
        icon={<Feather name="user" size={24} color="white" />}
        variant="rose"
        placeholder="Player name"
        value={userName}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(text) => setUserName(text)}
        maxLength={8}
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
        onPress={() => createAcount(email, password, userName, pictureUrl)}
      />
      <View className="flex-row ">
        <Text className="text-white text-base "> have an account?</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary text-base "> Sign in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
