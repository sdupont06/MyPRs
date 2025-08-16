import { Modal, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { styles } from "../styles";
import OptionSelection from "../optionSelection";

// Takes in a value denoting whether the modal is visible, its label, and functions
// allowing it to set its own visibility, change text on the parent component,
// and submit a name for both days (general text) and spreadsheets
interface Props {
  visibility: boolean;
  label: string;
  setVisibilty: (val: boolean) => void;
  setText: (text: string) => void;
  handleTextSubmit: () => void;
  handleSheetSubmit: () => void;
}

// A special modal used with the GenericBlockPage- the only difference is that
// this modal has an option to add a spreadsheet and can handle doing so. Could
// be done by adding an option to the generic labelling modal, but that adds a
// unique feature to a component that will likely be used elsewhere (plus I'm lazy)
export default function LabelSSModal(props: Props) {
  let selectionOptions = ["Add Day", "Add Spreadsheet"];
  let [selectedOption, setSelectedOption] = useState(0);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={props.visibility}
      onRequestClose={() => props.setVisibilty(false)}
    >
      <View style={styles.outerModalView}>
        <View style={{ flex: 2 }}></View>
        <View style={styles.innerModalView}>
          <Ionicons
            name="close"
            onPress={() => props.setVisibilty(false)}
            size={24}
            color="gray"
            style={{
              alignSelf: "flex-end",
            }}
          ></Ionicons>
          <OptionSelection
            options={selectionOptions}
            selectedOption={selectedOption}
            optionHorizontalPadding={0}
            setSelectedOption={(index) => {
              setSelectedOption(index);
            }}
          ></OptionSelection>

          {selectedOption === 0 && (
            <View
              style={{
                flex: 1,
                padding: 5,
                alignSelf: "center",
              }}
            >
              <TextInput
                autoFocus={true}
                onChangeText={(text) => props.setText(text)}
                onSubmitEditing={() => props.handleTextSubmit()}
                placeholder="Enter Label"
                placeholderTextColor={"gray"}
                style={{
                  textAlign: "center",
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  maxWidth: 300,
                }}
              ></TextInput>
            </View>
          )}

          {selectedOption === 1 && (
            <View
              style={{
                flex: 1,
                padding: 5,
                alignSelf: "center",
              }}
            >
              <TextInput
                autoFocus={true}
                onChangeText={(text) => props.setText(text)}
                onSubmitEditing={() => props.handleSheetSubmit()}
                placeholder="Paste Viewable Link"
                placeholderTextColor={"gray"}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  maxWidth: 300,
                }}
              ></TextInput>
            </View>
          )}
        </View>
        <View style={{ flex: 2 }}></View>
      </View>
    </Modal>
  );
}
