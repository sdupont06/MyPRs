import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Takes in a label for the tab and a function to be called when the delete button
// on this tab is pressed (since data about tabs is stored in the GenericBlockPage
// parent component)
interface Props {
  label: string;
  handleDelete: (item: String) => void;
}

// A tab for each day in a particular workout block/split (the blue boxes with
// exercises, can be multiple on a single GenericBlockPage)
export default function DayTabBox(props: Props) {
  // Saves the tabs using the AsyncStorage library; see index.tsx for more info
  // on how this works.
  const saveExercises = async () => {
    await AsyncStorage.setItem(
      `${props.label}Exercises`,
      JSON.stringify(exercises)
    ).catch((reason) => alert(reason));
  };

  const getExercises = async () => {
    let retrivedExercises = await AsyncStorage.getItem(
      `${props.label}Exercises`
    ).catch((reason) => alert(reason));

    if (retrivedExercises != null) {
      setExercises(JSON.parse(retrivedExercises));
    }
  };

  // Retrieves locally stored data on first load
  useEffect(() => {
    getExercises();
  }, []);

  // State variables for the exercises, entered text, and whether or not "edit"
  // mode has been acitvated (the delete button appears)
  let [exercises, setExercises] = useState([{ name: "", sets: "", reps: "" }]);
  let [curExerciseText, setCurExerciseText] = useState("");
  let [curSetsText, setCurSetsText] = useState("");
  let [curRepsText, setCurRepsText] = useState("");
  let [deletable, setDeletable] = useState(false);

  // When a new exercise is submitted, call this function
  const handleExerciseSubmit = () => {
    // Create a new exercise with the entered name, sets, and reps, then add it
    // to the end of the exercises array and update state
    exercises = exercises.concat([
      {
        name: curExerciseText,
        sets: curSetsText,
        reps: curRepsText,
      },
    ]);
    setExercises(exercises);

    // Save exercises
    saveExercises();

    // Clear text input boxes
    setCurExerciseText("");
    setCurSetsText("");
    setCurRepsText("");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setDeletable(false)}
      onLongPress={() => setDeletable(true)}
      style={{
        alignItems: "center",
        backgroundColor: "darkcyan",
        padding: 5,
        borderRadius: 10,
        flex: 1,
        gap: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            flex: 12,
          }}
        >
          {props.label}
        </Text>
        {deletable && (
          <Ionicons
            name="trash-outline"
            size={20}
            onPress={() => {
              AsyncStorage.removeItem(`${props.label}Exercises`);
              props.handleDelete(props.label);
            }}
          ></Ionicons>
        )}
      </View>
      <View
        style={{
          flex: 1,
          gap: 10,
        }}
      >
        {exercises.map((exercise) => {
          if (!(exercise.name === "")) {
            return (
              <View
                key={exercise.name}
                style={{
                  backgroundColor: "gray",
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 2,
                  borderRadius: 10,
                }}
              >
                <Text style={styles.exerciseText}>{exercise.name}</Text>
                <Text style={styles.exerciseText}>{exercise.sets}</Text>
                <Ionicons name="close" size={20} color="black"></Ionicons>
                <Text style={styles.exerciseText}>{exercise.reps}</Text>
              </View>
            );
          }
        })}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
          }}
        >
          <TextInput
            value={curExerciseText}
            style={styles.inputBox}
            placeholder="Exercise"
            placeholderTextColor={"darkgray"}
            onChangeText={(text) => {
              setCurExerciseText(text);
            }}
          ></TextInput>
          <TextInput
            value={curSetsText}
            style={styles.inputBox}
            placeholder="Sets"
            placeholderTextColor={"darkgray"}
            maxLength={5}
            onChangeText={(text) => {
              setCurSetsText(text);
            }}
          ></TextInput>
          <Ionicons name="close" size={20} color="black"></Ionicons>
          <TextInput
            value={curRepsText}
            style={styles.inputBox}
            placeholder="Reps"
            placeholderTextColor={"darkgray"}
            maxLength={5}
            onChangeText={(text) => {
              setCurRepsText(text);
            }}
          ></TextInput>
          <Button
            title="Submit"
            color="white"
            onPress={handleExerciseSubmit}
          ></Button>
        </View>
      </View>
    </TouchableOpacity>
  );
}
