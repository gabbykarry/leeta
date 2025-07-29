import ChipsToast from "@/components/GlobalToast";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Bold: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    Medium: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Regular: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    Light: require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    ExtraBold: require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    SemiBold: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  const router = useRouter();

  if (!loaded) {
    return null;
  }

  useEffect(() => {
    if (loaded) router.replace("/screens");
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack>
        <Stack.Screen name="screens" options={{ headerShown: false }} />
      </Stack>
      <ChipsToast />
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
