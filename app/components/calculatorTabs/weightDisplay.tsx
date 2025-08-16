import { useState } from "react";
import { Text, View, Image } from "react-native";
import Svg, { Circle, Ellipse, Rect, RNSVGCircle } from "react-native-svg";
import { matrixTransform } from "react-native-svg/lib/typescript/elements/Shape";

interface Props {
  kiloPlates: {
    val: number;
  }[];

  poundPlates: {
    val: number;
  }[];

  // inventoryMode: boolean;
}

// Takes in an array of weights for both kilo and pound plates (one will be empty).
// This array is formatted from heaviest to lightest by design in the loadCalcPage.tsx
// file, so all the WeightDisplay has to do is output an SVG for each plate value, in order
export default function WeightDisplay(props: Props) {
  // Each method here is just the SVG definition for each thing. This will return
  // an SVG representing the barbell. Vertical height is 50% of the parent SVG component,
  // which places the top left corner at this position. Vertical position is then
  // translated by half of height to center correctly
  const bar = (x: number, k: number) => {
    return (
      <Svg>
        <Rect
          x={x}
          y={"50%"}
          translateY={-5}
          width={70}
          height={10}
          stroke="black"
          strokeWidth={1}
          fill="gray"
          rx={2}
        />

        <Rect
          x={x + 70}
          y={"50%"}
          translateY={-7.5}
          width={150}
          height={15}
          stroke="black"
          strokeWidth={1}
          fill="gray"
          rx={2}
        />
        <Rect
          x={x + 70}
          y={"50%"}
          translateY={-20}
          width={15}
          height={40}
          stroke="black"
          strokeWidth={1}
          fill="darkgray"
          rx={2}
        />
      </Svg>
    );
  };

  const twentyFiveKG = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-80}
        width={10}
        height={160}
        stroke="black"
        strokeWidth={1}
        fill="red"
        rx={5}
      />
    );
  };

  const twentyKG = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-80}
        width={10}
        height={160}
        stroke="black"
        strokeWidth={1}
        fill="darkblue"
        rx={5}
      />
    );
  };
  const fifteenKG = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-70}
        width={10}
        height={140}
        stroke="black"
        strokeWidth={1}
        fill="yellow"
        rx={5}
      />
    );
  };

  const tenKG = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-60}
        width={10}
        height={120}
        stroke="black"
        strokeWidth={1}
        fill="green"
        rx={5}
      />
    );
  };

  const fiveKG = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-40}
        width={10}
        height={80}
        stroke="black"
        strokeWidth={1}
        fill="white"
        rx={5}
      />
    );
  };

  const twoHalfKG = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-35}
        width={7.5}
        height={70}
        stroke="black"
        strokeWidth={1}
        fill="black"
        rx={5}
      />
    );
  };

  const oneTwoFiveKG = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-30}
        width={5}
        height={60}
        stroke="black"
        strokeWidth={1}
        fill="silver"
        rx={5}
      />
    );
  };

  const fortyFiveLBS = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-80}
        width={15}
        height={160}
        stroke="black"
        strokeWidth={1}
        fill="darkred"
        rx={5}
      />
    );
  };

  const thirtyFiveLBS = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-70}
        width={15}
        height={140}
        stroke="black"
        strokeWidth={1}
        fill="darkblue"
        rx={5}
      />
    );
  };

  const twentyFiveLBS = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-60}
        width={15}
        height={120}
        stroke="black"
        strokeWidth={1}
        fill="gold"
        rx={5}
      />
    );
  };

  const tenLBS = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-50}
        width={10}
        height={100}
        stroke="black"
        strokeWidth={1}
        fill="darkgreen"
        rx={5}
      />
    );
  };

  const fiveLBS = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-40}
        width={10}
        height={80}
        stroke="black"
        strokeWidth={1}
        fill="gray"
        rx={5}
      />
    );
  };

  const twoFiveLBS = (x: number, k: number) => {
    return (
      <Rect
        key={k}
        x={x}
        y={"50%"}
        translateY={-30}
        width={5}
        height={60}
        stroke="black"
        strokeWidth={1}
        fill="gray"
        rx={5}
      />
    );
  };

  // Keeps track of where the current plate should be placed horizontally.
  // Vertical placement is just the center of the SVG graphic (20% down the screen)
  let xPos = 85;

  return (
    <Svg height="40%" width="100%">
      {bar(0, -1) /** Plots the bar */}

      {/** For each elt in the kiloPlates array, return an SVG of that plate
       * at the desired X, Y, and with index as its key. Increase xPos for each
       * plate added to keep track of where the next one should go.
       */}
      {props.kiloPlates.map((plate, index) => {
        switch (plate.val) {
          case 25:
            xPos += 10;
            return twentyFiveKG(xPos - 10, index);
          case 20:
            xPos += 10;
            return twentyKG(xPos - 10, index);
          case 15:
            xPos += 10;
            return fifteenKG(xPos - 10, index);
          case 10:
            xPos += 10;
            return tenKG(xPos - 10, index);
          case 5:
            xPos += 10;
            return fiveKG(xPos - 10, index);
          case 2.5:
            xPos += 7.5;
            return twoHalfKG(xPos - 7.5, index);
          case 1.25:
            xPos += 5;
            return oneTwoFiveKG(xPos - 5, index);
        }
      })}

      {/** Same idea as the above mapping */}
      {props.poundPlates.map((plate, index) => {
        switch (plate.val) {
          case 45:
            xPos += 15;
            return fortyFiveLBS(xPos - 15, index);
          case 35:
            xPos += 15;
            return thirtyFiveLBS(xPos - 15, index);
          case 25:
            xPos += 15;
            return twentyFiveLBS(xPos - 15, index);
          case 10:
            xPos += 10;
            return tenLBS(xPos - 10, index);
          case 5:
            xPos += 10;
            return fiveLBS(xPos - 10, index);
          case 2.5:
            xPos += 5;
            return twoFiveLBS(xPos - 5, index);
        }
      })}
    </Svg>
  );
}
