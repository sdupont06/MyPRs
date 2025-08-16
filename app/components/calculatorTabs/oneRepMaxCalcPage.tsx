import { Ionicons } from "@expo/vector-icons";
import { Text, View, TextInput, Button } from "react-native";
import { useState } from "react";

export default function OneRepMaxCalcPage() {
  // Simple state vars for entered text
  let [weight, setWeight] = useState(0);
  let [reps, setReps] = useState(0);
  let [estimatedMax, setEstimatedMax] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 30,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Estimated 1-Rep Max Calculator
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <TextInput
          placeholder="Weight"
          inputMode="decimal"
          maxLength={5}
          onChangeText={(text) => setWeight(Number(text))}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 20,
            textAlign: "center",
            fontSize: 20,
          }}
        ></TextInput>
        <TextInput
          placeholder="Reps"
          inputMode="decimal"
          maxLength={3}
          onChangeText={(text) => setReps(Number(text))}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 20,
            textAlign: "center",
            fontSize: 20,
          }}
        ></TextInput>
        <Button
          title={"Calculate"}
          onPress={() => setEstimatedMax((weight * reps) / 30.48 + weight)}
        ></Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            borderColor: "gray",
          }}
        >
          e1RM: {Math.round(estimatedMax * 100) / 100}
        </Text>
      </View>
    </View>
  );
}
