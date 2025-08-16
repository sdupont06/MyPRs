import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

// Takes in a label for the collapsed dropdown, an array of options, an functions
// which allow the dropdown to change the selected tab, set the modal's visibility,
// and delete options. Options are supplied from parent component since they also
// have to interact w/ the modal, so it's easier to have it all centralized above
interface Props {
  label: string;
  options: Option[];
  onOptionDelete: (item: Option) => void;
  setModalVisible: (val: boolean) => void;
  setSelectedBlockTab: (tab: string) => void;
}

// Interface defining a dropdown option. Has a label, a value describing whether it
// collapses/expands the dropdown on press, one describing whether or not it is
// deletable, and its type (either "add" or "select", as "add" must open the modal
// but "select" must change the selected option)
export interface Option {
  label: string;
  collapseOnPress: boolean;
  deletable: boolean;
  optionType: string;
}

// A dropdown menu, the options of which can manipulated by the user through a
// combination of parent component actions and interaction with this component
// directly
export default function EditableDropdown(props: Props) {
  let [expanded, setExpanded] = useState(false);
  let [deletable, setDeletable] = useState(false);

  // When the dropdown is pressed, turn off "deletable" mode and set expansion state
  const handleClick = () => {
    setExpanded(!expanded);
    setDeletable(false);
  };

  // When dropdown is long pressed, expand and turn on "deletable" mode (show
  // delete buttons)
  const handleLongClick = () => {
    setExpanded(true);
    setDeletable(true);
  };

  return (
    <View
      style={{
        alignItems: "center",
        gap: 5,
      }}
    >
      <TouchableOpacity
        onLongPress={handleLongClick}
        onPress={handleClick}
        style={styles.dropdownOption}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {props.label}
          </Text>
          <Ionicons
            name={expanded ? "caret-down" : "caret-back"}
            size={15}
          ></Ionicons>
        </View>
      </TouchableOpacity>
      {/** If expanded, maps all options to a TouchableOpacity below the dropdown,
       * giving the illusion of it collapsing and expanding
       */}
      {expanded &&
        props.options.map((item) => {
          return (
            <TouchableOpacity
              key={item.label}
              style={styles.dropdownOption}
              onPress={() => {
                if (item.collapseOnPress) {
                  setExpanded(false);
                }
                if (item.optionType === "add") {
                  props.setModalVisible(true);
                } else if (item.optionType === "select") {
                  props.setSelectedBlockTab(item.label);
                }
              }}
              onLongPress={handleLongClick}
            >
              <View style={styles.dropdownOption}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
                {deletable && item.deletable && (
                  <Ionicons
                    name="trash"
                    size={24}
                    onPress={() => props.onOptionDelete(item)}
                  ></Ionicons>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}
