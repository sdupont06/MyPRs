import { Modal, Text, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

// Takes in a value denoting whether the modal is visible, its label, and functions
// allowing it to set its own visibility, change text on the parent component,
// and submit entered text
interface Props {
  visibility: boolean;
  label: string;
  setVisibilty: (val: boolean) => void;
  setText: (text: string) => void;
  handleTextSubmit: () => void;
}

// A generic modal meant to add labels to things in a parent component; Looks
// stylistically nice for this app
export default function LabelModal(props: Props) {
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
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                padding: 10,
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {props.label}
            </Text>
            <TextInput
              autoFocus={true}
              onChangeText={(text) => props.setText(text)}
              onSubmitEditing={() => props.handleTextSubmit()}
              placeholder="Enter Label"
              placeholderTextColor={"gray"}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 50,
                paddingVertical: 15,
                maxWidth: 300,
                textAlign: "center",
              }}
            ></TextInput>
          </View>
        </View>
        <View style={{ flex: 2 }}></View>
      </View>
    </Modal>
  );
}
