import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";


export default function HeaderRight() {
  const navigation = useNavigation();

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
      <TouchableOpacity onPress={() => navigation.navigate("SpecialForMe")}>
        <Entypo name="user" size={24} color="white" />
      </TouchableOpacity>
      <AntDesign name="car" size={24} color="white" style={{ marginTop: 7 }} />
    </View>
  );
}

const styles = StyleSheet.create({});
