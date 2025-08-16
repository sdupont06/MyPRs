import { View } from "react-native";
import EditableDropdown from "../components/editableDropdown";
import { useEffect, useState } from "react";
import { Option } from "../components/editableDropdown";
import NoBlockSelectedPage from "../components/workoutPlanningPages/noBlockSelectedPage";
import LabelModal from "../components/labellingModal";
import GenericBlockPage from "../components/workoutPlanningPages/genericBlockPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  // Loading items from AsyncStorage library, which stores data as JSON locally on user's phone
  let getOptions = async () => {
    // Gets data labelled "dropdownOptions" somewhere magically from phone storage
    let savedOptions = await AsyncStorage.getItem("dropdownOptions").catch(
      (r) => console.log(r)
    );
    // Assuming data has been saved, parse into javascript and set the options
    if (savedOptions != null) {
      setDropdownOptions(JSON.parse(savedOptions));
    }
  };

  // Saves options in the main dropdown (large one as the top of homepage), since
  // user can add options that are meant to persist after app closes
  let saveDropdownOptions = async () => {
    // Sets item labelled "dropdownOptions" in AsyncStorage to be a JSON representation
    // of the options, then catches any errors
    await AsyncStorage.setItem(
      "dropdownOptions",
      JSON.stringify(dropdownOptions)
    ).catch((reason) => {
      alert(reason);
    });
  };

  // Default option in dropdown is the "Add Block/Split" option, which is not deletable,
  // will not collapse the dropdown when pressed, and will prompt the labelling modal
  // to open since it has the optionType.add property
  let [dropdownOptions, setDropdownOptions] = useState([
    {
      label: "Add Block/Split",
      deletable: false,
      collapseOnPress: false,
      optionType: "add",
    },
  ]);

  // On first mounting of this component (page load) call the getOptions() method
  // to load data stored locally
  useEffect(() => {
    getOptions();
  }, []);

  // Typical state variables
  let [modalVisible, setModalVisible] = useState(false);
  let [modalText, setModalText] = useState("");
  let [selectedBlockTab, setSelectedBlockTab] = useState("Add Block/Split");

  // Function to return a page that reflects which dropdown option the user has
  // selected. If no page is selected (the default option is selected), then
  // the homepage is shown. Otherwise, a generic page with the title of the option
  // will be generated. GenericBlockPage also takes a reference to the selectedBlockTab
  // state variable, that way it can re-render with new data every time the selected tab
  // changes.
  const getPage = () => {
    let page = <NoBlockSelectedPage></NoBlockSelectedPage>;
    if (selectedBlockTab != "Add Block/Split") {
      page = (
        <GenericBlockPage
          title={selectedBlockTab}
          selectedBlockTab={selectedBlockTab}
        ></GenericBlockPage>
      );
    }
    return page;
  };

  // Function called when text is submitted by the modal; If an option with that
  // name already exists, do nothing. Otherwise, create a new option, add it to the
  // dropdown, close the modal, and save it.
  const handleTextSubmit = () => {
    // Search for that option
    let found = false;
    dropdownOptions.forEach((option) => {
      if (option.label === modalText) {
        found = true;
      }
    });

    if (!found) {
      // Add new option to dropdownOptions raw variable
      let newOption = {
        label: modalText,
        deletable: true,
        collapseOnPress: true,
        optionType: "select",
      };
      dropdownOptions = [newOption].concat(dropdownOptions);

      // Update state and close modal, then save options to local storage
      setDropdownOptions(dropdownOptions);
      setModalVisible(false);
      saveDropdownOptions();
    }
  };

  // Function called by dropdown when an option is deleted; Removes that option using
  // filter, which deletes all items in list for which the passed function returns false.
  // Then sets selected page to the default option (which is always at the end
  // of the list), update state, and save options to local storage.
  const handleOptionDelete = (item: Option) => {
    dropdownOptions = dropdownOptions.filter((cur) => {
      return cur.label != item.label;
    });
    setSelectedBlockTab(dropdownOptions[dropdownOptions.length - 1].label);
    setDropdownOptions(dropdownOptions);
    saveDropdownOptions();
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 5,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/** Editable dropdown menu which can set selected tab, delete options, and
       * open/close the modal */}
      <EditableDropdown
        label="Block/Split"
        options={dropdownOptions}
        onOptionDelete={handleOptionDelete}
        setModalVisible={setModalVisible}
        setSelectedBlockTab={setSelectedBlockTab}
      ></EditableDropdown>

      {/** Modal which can change its own visibility, change the state variable modalText,
       * and call a function when text is submitted */}
      <LabelModal
        label="Add Block/Split"
        visibility={modalVisible}
        setVisibilty={setModalVisible}
        setText={setModalText}
        handleTextSubmit={handleTextSubmit}
      ></LabelModal>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        {getPage()}
      </View>
    </View>
  );
}
