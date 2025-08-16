import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import OptionSelection from "../optionSelection";

export default function StrengthPointsCalcs() {
  // State vars for inputted values and OptionSelection components
  let [bodyweight, setBodyweight] = useState(0);
  let [weightLifted, setWeightLifted] = useState(0);
  let [selectedGender, setSelectedGender] = useState(0);
  let [selectedUnit, setSelectedUnit] = useState(0);

  // Values calculated by methods below
  let [dots, setDots] = useState(0);
  let [wilks, setWilks] = useState(0);
  let [gl, setGl] = useState(0);

  // Constant coeeficients for male and female DOTS; same for WILKS 2020 and
  // IPF GL below
  const dotsCf = {
    maleA: -307.75076,
    maleB: 24.0900756,
    maleC: -0.1918759221,
    maleD: 0.0007391293,
    maleE: -0.000001093,
    femaleA: -57.96288,
    femaleB: 13.6175032,
    femaleC: -0.1126655495,
    femaleD: 0.0005158568,
    femaleE: -0.0000010706,
  };

  const wilksCf = {
    maleA: 47.46178854,
    maleB: 8.472061379,
    maleC: 0.07369410346,
    maleD: -0.001395833811,
    maleE: 0.00000707665973070743,
    maleF: -0.0000000120804336482315,
    femaleA: -125.4255398,
    femaleB: 13.71219419,
    femaleC: -0.03307250631,
    femaleD: -0.001050400051,
    femaleE: 0.00000938773881462799,
    femaleF: -0.000000023334613884954,
  };

  const glCf = {
    maleA: 1199.72839,
    maleB: 1025.18162,
    maleC: 0.00921,
    femaleA: 610.32796,
    femaleB: 1045.59282,
    femaleC: 0.03048,
  };

  // Sets dots, wilks, and gl variables to their respective values based on
  // entered bodyweight and total (and gender)
  const calculateAllScores = () => {
    // Since formulas used are for KGS, either leaves entered value in KGS or
    // converts to KGS based on which unit was selected
    let x = selectedUnit == 0 ? bodyweight / 2.205 : bodyweight;
    let w = selectedUnit == 0 ? weightLifted / 2.205 : weightLifted;

    if (selectedGender == 0) {
      // Formulas and values found at https://www.inchcalculator.com/lifting-strength-calculator/
      let tempGl =
        (100 / (glCf.maleA - glCf.maleB * Math.E ** (-glCf.maleC * x))) * w;

      let tempDots =
        (500 /
          (dotsCf.maleA +
            dotsCf.maleB * x +
            dotsCf.maleC * x ** 2 +
            dotsCf.maleD * x ** 3 +
            dotsCf.maleE * x ** 4)) *
        w;

      let tempWilks =
        (600 /
          (wilksCf.maleA +
            wilksCf.maleB * x +
            wilksCf.maleC * x ** 2 +
            wilksCf.maleD * x ** 3 +
            wilksCf.maleE * x ** 4 +
            wilksCf.maleF * x ** 5)) *
        w;

      // Rounds vals to 2 decimal places and assigns
      setGl(Math.round(tempGl * 100) / 100);
      setDots(Math.round(tempDots * 100) / 100);
      setWilks(Math.round(tempWilks * 100) / 100);
    } else if (selectedGender == 1) {
      let tempGl =
        (100 / (glCf.femaleA - glCf.femaleB * Math.E ** (-glCf.femaleC * x))) *
        w;

      let tempDots =
        (500 /
          (dotsCf.femaleA +
            dotsCf.femaleB * x +
            dotsCf.femaleC * x ** 2 +
            dotsCf.femaleD * x ** 3 +
            dotsCf.femaleE * x ** 4)) *
        w;

      let tempWilks =
        (600 /
          (wilksCf.femaleA +
            wilksCf.femaleB * x +
            wilksCf.femaleC * x ** 2 +
            wilksCf.femaleD * x ** 3 +
            wilksCf.femaleE * x ** 4 +
            wilksCf.femaleF * x ** 5)) *
        w;

      setGl(Math.round(tempGl * 100) / 100);
      setDots(Math.round(tempDots * 100) / 100);
      setWilks(Math.round(tempWilks * 100) / 100);
    }
  };

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
        DOTS, WILKS, and IPF GL Calculator
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <TextInput
          placeholder="Bodyweight"
          inputMode="decimal"
          maxLength={3}
          onChangeText={(text) => setBodyweight(Number(text))}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 15,
            textAlign: "center",
            fontSize: 20,
          }}
        ></TextInput>
        <TextInput
          placeholder="Total"
          inputMode="decimal"
          maxLength={5}
          onChangeText={(text) => setWeightLifted(Number(text))}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 15,
            textAlign: "center",
            fontSize: 20,
          }}
        ></TextInput>
        <Button title={"Calculate"} onPress={calculateAllScores}></Button>
      </View>
      <View
        style={{
          alignItems: "center",
          gap: 10,
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
          DOTS: {dots}
        </Text>
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
          WILKS: {wilks}
        </Text>
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
          GL: {gl}
        </Text>
      </View>
      <OptionSelection
        options={["Male", "Female"]}
        selectedOption={selectedGender}
        setSelectedOption={setSelectedGender}
      ></OptionSelection>
      <OptionSelection
        options={["LBS", "KGS"]}
        selectedOption={selectedUnit}
        setSelectedOption={setSelectedUnit}
      ></OptionSelection>
    </View>
  );
}
