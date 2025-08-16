import { StyleSheet } from "react-native";

// Styles that I didn't wanna write multiple times, or just ones that could be
// reused later. Not really any point to this other than I wanted to do it, so
// shut up
export const styles = StyleSheet.create({
  dropdownOption: {
    backgroundColor: "darkgray",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
  },
  bottomCornerButton: {
    backgroundColor: "darkgray",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  outerModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  innerModalView: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    maxWidth: 300,
  },

  inputBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    maxWidth: 100,
    color: "white",
  },

  exerciseText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    padding: 10,
  },
});
