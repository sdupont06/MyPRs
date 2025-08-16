import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import WebView from "react-native-webview";

// Takes in a "label" (link to the content to be displayed), and a function to be
// called on deletion
interface Props {
  label: string;
  handleDelete: (item: String) => void;
}

// Works the same as the DayTab component, but with a WebView displaying the
// entered URL (meant to be a shareable Google Sheet or similar document)
export default function SpreadsheetTab(props: Props) {
  let [deletable, setDeletable] = useState(false);

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
      {deletable && (
        <Ionicons
          name="trash-outline"
          style={{
            alignSelf: "flex-end",
          }}
          size={20}
          onPress={() => {
            AsyncStorage.removeItem(`${props.label}Exercises`);
            props.handleDelete(props.label);
          }}
        ></Ionicons>
      )}
      <WebView
        style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          width: 370,
          height: 500,
          borderRadius: 10,
        }}
        source={{
          uri: props.label,
        }}
      ></WebView>
    </TouchableOpacity>
  );
}
