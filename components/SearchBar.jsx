import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <TouchableOpacity style={styles.container}>
      <AntDesign
        name="search1"
        size={20}
        color="black"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder="Kelime veya ilan No. ile ara"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Feather name="mic" size={20} color="black" style={styles.micIcon} />
      <Ionicons
        name="camera-outline"
        size={24}
        color="black"
        style={styles.camIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    paddingLeft: 40,
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
