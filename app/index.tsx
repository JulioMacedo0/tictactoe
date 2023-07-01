import { Link, Redirect, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Page() {
  const useAuth = false;
  return useAuth ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
