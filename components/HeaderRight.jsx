import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function HeaderRight() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        marginRight: 12,
      }}
    >
      <Entypo name="user" size={24} color="white" />
      <AntDesign name="car" size={24} color="white" style={{ marginTop: 7 }} />
    </View>
  );
}

const styles = StyleSheet.create({});
