import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

// Takes in a list of options, a number denoting which is selected (1...n),
// an optional arg for the horizontal padding of each option, and a function
// allowing this component to change the selected option
interface Props {
  options: string[];
  selectedOption: number;
  optionHorizontalPadding?: number;
  setSelectedOption: (index: number) => void;
}

// A simple type of option selector which is basically just a list with one
// option highlighted based on where the user has pressed. Used frequently for
// unit selections in this app
export default function OptionSelection(props: Props) {
  // Styles for each option (rounding the correct corners to make it look smooth),
  // also with active variants for different colors. Defined here so that
  // it can access the optionHorizontalPadding arg in props
  const styles = StyleSheet.create({
    leftOption: {
      backgroundColor: "darkgray",
      borderWidth: 1,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      paddingHorizontal: props.optionHorizontalPadding,
    },

    rightOption: {
      backgroundColor: "darkgray",
      borderWidth: 1,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      paddingHorizontal: props.optionHorizontalPadding,
    },

    middleOption: {
      backgroundColor: "darkgray",
      borderWidth: 1,
      paddingHorizontal: props.optionHorizontalPadding,
    },

    leftOptionActive: {
      backgroundColor: "darkcyan",
      borderWidth: 1,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      paddingHorizontal: props.optionHorizontalPadding,
    },

    rightOptionActive: {
      backgroundColor: "darkcyan",
      borderWidth: 1,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      paddingHorizontal: props.optionHorizontalPadding,
    },

    middleOptionActive: {
      backgroundColor: "darkcyan",
      borderWidth: 1,
      paddingHorizontal: props.optionHorizontalPadding,
    },
  });

  // Returns the style of each option based on its index and the selected index
  // (first gets left option, last gets right option, selected gets active variant)
  const getStyle = (index: number) => {
    if (index === props.selectedOption) {
      if (index === 0) {
        return styles.leftOptionActive;
      } else if (index === props.options.length - 1) {
        return styles.rightOptionActive;
      } else {
        return styles.middleOptionActive;
      }
    } else {
      if (index === 0) {
        return styles.leftOption;
      } else if (index === props.options.length - 1) {
        return styles.rightOption;
      } else {
        return styles.middleOption;
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
      }}
    >
      {props.options.map((option, index) => {
        return (
          <View
            key={option}
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={getStyle(index)}
              activeOpacity={1}
              onPress={() => {
                props.setSelectedOption(index);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
