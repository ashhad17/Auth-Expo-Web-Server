import { ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/auth";
import LoginForm from "@/components/LoginForm";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  // Redirect to tab layout when user is authenticated
  return <Redirect href="/(tabs)/home" />;
}
