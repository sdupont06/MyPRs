import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

// Default homepage
export default function NoBlockSelectedPage() {
  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Ionicons name="arrow-up" size={50} color="darkcyan"></Ionicons>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
        }}
      >
        Select or create a new tab from this menu
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
        }}
      >
        (tap and hold to edit existing tabs)
      </Text>
    </View>
  );
}
