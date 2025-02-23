import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";

const SearchComponent = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("search")}
    >
      <AntDesign
        name="search1"
        size={20}
        color="black"
        style={styles.searchIcon}
      />
      <View
        style={styles.input}
        placeholder="Kelime veya ilan No. ile ara"
      ><Text style={{color:"#a7b0a9"}}>Kelime veya ilan No. ile ara</Text></View>

      <Feather name="mic" size={20} color="black" style={styles.micIcon} />
      <Ionicons
        name="camera-outline"
        size={24}
        color="black"
        style={styles.camIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  searchIcon: {
    position: "absolute",
    top: 35,
    left: 35,
  },
  micIcon: {
    position: "absolute",
    top: 33,
    right: 70,
  },
  camIcon: {
    position: "absolute",
    top: 33,
    right: 35,
  },
});

export default SearchComponent;
