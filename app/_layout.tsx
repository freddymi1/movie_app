import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";
export default function RootLayout() {
  return (
    <>
      <StatusBar
        hidden={false}
        translucent={true} // Rend la barre transparente (Android)
        backgroundColor="transparent" // Couleur de fond transparente
        barStyle="light-content" // Texte blanc (ou "dark-content")
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
