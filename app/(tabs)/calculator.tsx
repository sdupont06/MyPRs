import { useState } from "react";
import LoadCalcPage from "../components/calculatorTabs/loadCalcPage";
import OptionSelection from "../components/optionSelection";
import OneRepMaxCalcPage from "../components/calculatorTabs/oneRepMaxCalcPage";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import StrengthPointsCalcs from "../components/calculatorTabs/strengthPointsCalc";

export default function WeightCalculator() {
  let [selectedOption, setSelectedOption] = useState(0);

  return (
    // Wrapped in TouachableWithoutFeedback so a press anywhere on screen dismisses the keyboard
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
        }}
      >
        {/** Option selection menu at top, shows desired page with selection */}
        <OptionSelection
          options={["Bar Load", "DOTS/WILKS/GL", "1RM"]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        ></OptionSelection>
        {selectedOption == 0 && <LoadCalcPage />}
        {selectedOption == 1 && <StrengthPointsCalcs />}
        {selectedOption == 2 && <OneRepMaxCalcPage />}
      </View>
    </TouchableWithoutFeedback>
  );
}
