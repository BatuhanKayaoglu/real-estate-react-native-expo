import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
  ]);

  // Filtrelenmiş veriler
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={20} color="black" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Kelime veya ilan No. ile ara"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Feather name="mic" size={20} color="black" style={styles.micIcon} />
      <Ionicons name="camera-outline" size={24} color="black" style={styles.camIcon} />
      {/* <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results found</Text>
        }
      /> */}
    </View>
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
    paddingLeft: 50,
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
