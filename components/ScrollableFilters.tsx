import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { scaleHeight, spacing } from "@/utils/helpers";

type FiltersProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

export default function Filters({
  options,
  selectedOption,
  setSelectedOption,
}: FiltersProps) {
  return (
    <View
      // horizontal={true}
      // showsHorizontalScrollIndicator={false}
      // showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedOption(option)}
          style={[
            styles.option,
            selectedOption === option && {
              backgroundColor: "#1A1A1A",
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              selectedOption === option && { color: "white" },
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    paddingTop: spacing(40),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  option: {
    paddingHorizontal: spacing(40),
    paddingVertical: spacing(25),
    borderRadius: 35,
    backgroundColor: "#F7F6F9",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Medium",
    color: "black",
    fontSize: scaleHeight(13),
  },
});
