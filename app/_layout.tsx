import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChipsToast from "@/components/GlobalToast";

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

  if (!loaded) {
    return null;
  }

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
