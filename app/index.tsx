import { Redirect } from "expo-router";

export default function Page() {
  const useAuth = false;
  return useAuth ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
