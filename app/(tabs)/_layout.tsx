import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    // Styling options for tab layout
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "darkcyan",
        },
        tabBarStyle: {
          backgroundColor: "darkcyan",
        },
      }}
    >
      {/** Each Tabs.Screen element defines another tab, with name defining the
       * directory where their definitions can be found. The rest are styling options.*/}
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="home"
                size={24}
                color={focused ? "white" : "black"}
              ></Ionicons>
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="calculator"
        options={{
          headerTitle: "Calculators",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarLabel: "Calculators",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="calculator"
                size={24}
                color={focused ? "white" : "black"}
              ></Ionicons>
            );
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="help"
        options={{
          headerTitle: "Help",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarLabel: "Help",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={focused ? "white" : "black"}
              ></Ionicons>
            );
          },
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
