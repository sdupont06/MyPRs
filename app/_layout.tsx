import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // Defines a single-page stack which is defined in the (tabs) folder
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
