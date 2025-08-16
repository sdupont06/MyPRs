import { Ionicons } from "@expo/vector-icons";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import LabelSSModal from "./labelSpreadsheetModal";
import { useEffect, useState } from "react";
import DayTabBox from "./dayTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpreadsheetTab from "./spreadsheetTab";

// Takes in a title for the page and the name of the currently selected block/split
// tab (from the main dropdown). This is needed since the GenericBlockPage needs to
// re-render with a different block every time a new tab is selected, so this value
// can be combined with the useEffect hook to achieve this outcome
interface Props {
  title: string;
  selectedBlockTab: string;
}

// A generic component which can display a labelled and customized workout block
// or split. A single GenericBlockPage can re-render with the desired data at any
// point, making it easy to create new pages without the user actually adding
// any components
export default function GenericBlockPage(props: Props) {
  // See index.tsx for detailed comments on the functionality and use of the
  // AsyncStorage library, used by the four below methods to locally save JSON
  // data
  const saveDays = async () => {
    await AsyncStorage.setItem(
      `${props.title}tabDays`,
      JSON.stringify(tabDays)
    ).catch((reason) => {
      alert(reason);
    });
  };

  const getDays = async () => {
    let retrievedDays = await AsyncStorage.getItem(
      `${props.title}tabDays`
    ).catch((reason) => alert(reason));
    if (retrievedDays != null) {
      setTabDays(JSON.parse(retrievedDays));
    } else {
      setTabDays([""]);
    }
  };

  const saveSheets = async () => {
    await AsyncStorage.setItem(
      `${props.title}tabSheets`,
      JSON.stringify(tabSheets)
    ).catch((reason) => {
      alert(reason);
    });
  };

  const getSheets = async () => {
    let retrievedSheets = await AsyncStorage.getItem(
      `${props.title}tabSheets`
    ).catch((reason) => alert(reason));
    if (retrievedSheets != null) {
      setTabSheets(JSON.parse(retrievedSheets));
    } else {
      setTabSheets([""]);
    }
  };

  // Loads saved days and sheets whenever a new tab is selected; re-renders
  // when a new page is to be shown
  useEffect(() => {
    getDays();
    getSheets();
  }, [props.selectedBlockTab]);

  // Function to be called when a day is deleted from some internal process
  // (most likely its delete button but yk). This will remove that tab from the
  // array of tab labels, then change state, re-render, and save the new array
  // locally
  const handleDeleteDay = (item: String) => {
    tabDays = tabDays.filter((cur) => {
      return cur != item;
    });
    setTabDays(tabDays);
    saveDays();
  };

  // Same as above, different array
  const handleDeleteSheet = (item: String) => {
    tabSheets = tabSheets.filter((cur) => {
      return cur != item;
    });
    setTabSheets(tabSheets);
    saveSheets();
  };

  // State vars describing the visibility of the modal, the text entered to the
  // modal, and the labels of all days and sheets added to this page
  let [modalVisible, setModalVisible] = useState(false);
  let [modalText, setModalText] = useState("");
  let [tabDays, setTabDays] = useState([""]);
  let [tabSheets, setTabSheets] = useState([""]);

  // Called when the modal submits a name for a new spreadsheet. First searches
  // for if that sheet already exists, then only accepts the entry if it does
  // not already exist
  const handleAddSheet = () => {
    let found = false;
    for (let i = 0; i < tabSheets.length; i++) {
      if (tabSheets[i] === modalText) {
        found = true;
      }
    }
    // If it does not already exist, close the modal and add a new sheet, then
    // update state and save locally
    if (!found) {
      setModalVisible(false);
      tabSheets = tabSheets.concat([modalText]);
      setTabSheets(tabSheets);
      saveSheets();
    }
  };

  // Exact same as above method, but with a different array (days rather than
  // sheets)
  const handleAddDay = () => {
    let found = false;
    for (let i = 0; i < tabDays.length; i++) {
      if (tabDays[i] === modalText) {
        found = true;
      }
    }
    if (!found) {
      setModalVisible(false);
      tabDays = tabDays.concat([modalText]);
      setTabDays(tabDays);
      saveDays();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 5,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "black",
            opacity: 0.5,
            padding: 5,
            borderRadius: 10,
          }}
        >
          {props.title}
        </Text>
        <View
          style={{
            gap: 10,
          }}
        >
          {tabDays.map((label) => {
            return (
              label != "" && (
                <DayTabBox
                  handleDelete={handleDeleteDay}
                  key={label}
                  label={label}
                ></DayTabBox>
              )
            );
          })}

          {tabSheets.map((label) => {
            return (
              label != "" && (
                <SpreadsheetTab
                  handleDelete={handleDeleteSheet}
                  key={label}
                  label={label}
                ></SpreadsheetTab>
              )
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.bottomCornerButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="add"
          size={24}
        ></Ionicons>
      </TouchableOpacity>

      <LabelSSModal
        label="Add New Day"
        visibility={modalVisible}
        setVisibilty={setModalVisible}
        setText={setModalText}
        handleTextSubmit={handleAddDay}
        handleSheetSubmit={handleAddSheet}
      ></LabelSSModal>
    </View>
  );
}
