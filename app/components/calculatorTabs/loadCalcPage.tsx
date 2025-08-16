import { View, Text, TextInput } from "react-native";
import OptionSelection from "../optionSelection";
import WeightDisplay from "./weightDisplay";
import { useState } from "react";

export default function LoadCalcPage() {
  const getKiloPlates = (weight: number) => {
    let finalWeight = 20;
    const plateVals = [25, 20, 15, 10, 5, 2.5, 1.25];
    weight = entryUnit == 0 ? Math.min(670, weight) : Math.min(1480, weight);

    weight -= entryUnit === 0 ? 20 : 44;
    let ret = [];
    for (let i = 0; i < plateVals.length; i++) {
      // Converts current value of weight (target for this pass) to half its value
      // (in order to just do one side of the bar) and converts it to the desired unit
      let weightConverted = entryUnit === 0 ? weight / 2 : weight / 4.41;

      // Calculates number of this weight (this index of plateVals) plates to
      // add; adds the maximum amount without overshooting the desired value, unless
      // overshooting with one extra would provide the most accurate possible combination (< 2.5lbs error)
      let platesToAdd =
        Math.abs(
          weight -
            (entryUnit === 0 ? plateVals[i] * 2 : plateVals[i] * 4.41) *
              (Math.floor(weightConverted / plateVals[i]) + 1)
        ) < 2.5
          ? Math.floor(weightConverted / plateVals[i]) + 1
          : Math.floor(weightConverted / plateVals[i]);

      // Adds the determined number of this plate to the return list, incrementing
      // the total added weight as well
      for (let j = 0; j < platesToAdd; j++) {
        finalWeight += 2 * plateVals[i];
        ret.push({ val: plateVals[i] });
      }

      // Removes the total weight added from the desired weight, allowing for
      // the next pass to repeat the process
      if (platesToAdd > 0) {
        weight -=
          platesToAdd *
          (entryUnit === 0 ? 2 * plateVals[i] : 4.41 * plateVals[i]);
      }
    }

    // Updates non-state variable, works since re-render happens anyways (could be a cool way to optimize other stuff?)
    displayedWeight = {
      lbs: Math.round(finalWeight * 2.205 * 10) / 10,
      kg: Math.round(finalWeight * 10) / 10,
    };

    return ret;
  };

  // Same thing but with pound values and slightly different conversions
  // Assumes a 45lbs bar instead of a 20kg bar, which is around 44lbs
  const getPoundPlates = (weight: number) => {
    let finalWeight = 45;
    const plateVals = [45, 35, 25, 10, 5, 2.5];
    weight = entryUnit == 0 ? Math.min(346, weight) : Math.min(765, weight);

    weight -= entryUnit === 1 ? 45 : 20;
    let ret = [];

    for (let i = 0; i < plateVals.length; i++) {
      let weightConverted = entryUnit === 1 ? weight / 2 : (weight * 2.205) / 2;

      let platesToAdd =
        Math.abs(
          weight -
            (entryUnit === 0 ? (plateVals[i] / 2.205) * 2 : plateVals[i] * 2) *
              (Math.floor(weightConverted / plateVals[i]) + 1)
        ) < 2.5
          ? Math.floor(weightConverted / plateVals[i]) + 1
          : Math.floor(weightConverted / plateVals[i]);

      for (let j = 0; j < platesToAdd; j++) {
        finalWeight += 2 * plateVals[i];
        ret.push({ val: plateVals[i] });
      }

      if (platesToAdd > 0) {
        weight -=
          platesToAdd *
          (entryUnit === 1 ? plateVals[i] * 2 : (plateVals[i] * 2) / 2.205);
      }
    }

    displayedWeight = {
      lbs: Math.round(finalWeight * 100) / 100,
      kg: Math.round((finalWeight / 2.205) * 100) / 100,
    };

    return ret;
  };

  // Variables for display and OptionSelection components
  let displayedWeight = { lbs: 0, kg: 0 };
  let [plateType, setSelectedPlateType] = useState(0);
  let [entryUnit, setSelectedEntryUnit] = useState(1);
  let [enteredWeight, setEnteredWeight] = useState(0);
  // let [inventoryMode, setInventoryMode] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      {/** Passes an empty array for the plate type which was not selected, and
       * calls needed method to get the plates array for the selected type; this
       * allows WeightDisplay to display the proper type of plate without directly
       * knowing which type of plate was selected.
       */}
      <WeightDisplay
        kiloPlates={plateType === 0 ? getKiloPlates(enteredWeight) : []}
        poundPlates={plateType === 1 ? getPoundPlates(enteredWeight) : []}
        // inventoryMode={inventoryMode}
      ></WeightDisplay>
      <Text
        style={{ fontSize: 30, fontWeight: "bold", paddingBottom: 30 }}
      >{`${displayedWeight.lbs} LBS / ${displayedWeight.kg} KG`}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: 100,
          gap: 10,
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            padding: 20,
            fontSize: 20,
          }}
          placeholder="Enter Weight to Display"
          inputMode="decimal"
          onChangeText={(text) => {
            setEnteredWeight(Number(text));
          }}
        ></TextInput>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {entryUnit === 1 ? "LBS" : "KGS"}
        </Text>
      </View>

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Plate Type</Text>
      <OptionSelection
        options={["KGS", "LBS"]}
        selectedOption={plateType}
        optionHorizontalPadding={10}
        setSelectedOption={setSelectedPlateType}
      ></OptionSelection>

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Entry Unit</Text>
      <OptionSelection
        options={["KGS", "LBS"]}
        selectedOption={entryUnit}
        optionHorizontalPadding={10}
        setSelectedOption={setSelectedEntryUnit}
      ></OptionSelection>
    </View>
  );
}
