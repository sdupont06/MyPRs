import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Help() {
  // Help page explaining all features
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          gap: 10,
        }}
      >
        <Text style={textStyles.header}>About MyPRs</Text>
        <Text style={textStyles.body}>
          MyPRs is solo project I created my freshman year of college in order
          to gain more experience with React and general app development. As a
          Teen III USAPL lifter myself, a workout app was an obvious choice for
          this. {"\n\n"}MyPRs is still very much in development! I plan to add
          tons more features, including my own in-app editable spreadsheet
          interface, tracking capabilities for runners, perhaps a macro tracker,
          and more. Any suggestions for improvement are highly appreciated, and
          I will be reading all app store reviews. {"\n\n"}From an aspiring
          software engineer, thank you for using MyPRs. Have a great lift!
        </Text>

        <Text style={textStyles.header}>Home Page and Workout Planning</Text>

        <Text style={textStyles.subHeader}>Adding/Removing Workout Splits</Text>
        <Ionicons name="home" size={24}></Ionicons>
        <Text style={textStyles.body}>
          This page allows you to write and plan your personal workouts! Start
          by tapping the dropdown menu at the top of the screen, then tapping
          the "Add Block/Split" button. {"\n\n"}To delete any created splits,
          just tap and hold their menu option until the delete icon appears!
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "darkgray",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 20, padding: 10 }}>Block/Split</Text>
          <Ionicons name="caret-back" size={18}></Ionicons>
        </TouchableOpacity>
        <Text style={textStyles.body}>
          Common splits include Push-Pull-Legs and Upper-Lower, but this menu
          can also be used for powerlifting blocks, running days, and anything
          in between!
        </Text>

        <Text style={textStyles.subHeader}>Days and Exercises</Text>
        <Text style={textStyles.body}>
          Once you've created a new split and opened its page, you can add new
          days to your workout with the button in the bottom right corner. For
          example, If you've just created a Push-Pull-Legs split, then the first
          day you add will probably be called Push!
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "darkgray",
            flexDirection: "row",
            width: "15%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Ionicons name="add" size={20} style={{ padding: 5 }}></Ionicons>
        </TouchableOpacity>
        <Text style={textStyles.body}>
          After adding a day, you can add as many exercises as you want to it
          using the provided Exercise, Sets, and Reps form. {"\n\n"}Like splits,
          these days can be deleted by tapping and holding until the delete icon
          appears.
        </Text>
        <Text style={textStyles.subHeader}>Embedded Spreadsheets</Text>
        <Text style={textStyles.body}>
          The button in the bottom right also allows you to embed spreadsheets
          with existing workouts, right into the app! Simply create a shareable
          link for your spreadsheet, then paste it into the box under "Add
          Spreadsheet." {"\n\n"}Delete spreadsheets just like splits and days.
          Tap and hold!
        </Text>
        <Text style={textStyles.header}>Calculators</Text>
        <Ionicons name="calculator" size={24}></Ionicons>
        <Text style={textStyles.subHeader}>Bar Load</Text>
        <Text style={textStyles.body}>
          This page takes the math out of lifting! Simply enter the weight you
          want to lift, selecting your desired unit and plate type (LBS or KG),
          and MyPRs will display the closest possible plate combination to that
          weight!
        </Text>
        <Text style={textStyles.subHeader}>DOTS, WILKS, and IPF GL</Text>
        <Text style={textStyles.body}>
          Geared towards powerlifters, this page allows you to calculate your
          DOTS, WILKS, and IPF scores based on bodyweight and total weight
          lifted. These three scores are the most widely used pound-for-pound
          strength metrics in the world, and are used by nearly every
          powerlifting federation to award overall placement.
        </Text>
        <Text style={textStyles.subHeader}>Estimated 1-Rep Max</Text>
        <Text style={textStyles.body}>
          One of my personal favorite features, the e1RM tab lets you estimate
          your one-rep max lift using a lighter weight for multiple reps. This
          calculator is most accurate with lower-rep sets (5 or less), however
          it provides a fairly accurate strength estimate with anything up to 10
          reps.
        </Text>
      </View>
    </ScrollView>
  );
}

const textStyles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    borderBottomWidth: 1,
    paddingTop: 15,
  },
  subHeader: { fontSize: 18, fontWeight: "bold", paddingTop: 10 },
  body: {
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    lineHeight: 25,
  },
});
