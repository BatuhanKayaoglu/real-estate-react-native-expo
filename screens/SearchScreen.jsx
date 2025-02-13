import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFilterListingsQuery } from "../store/apis/listingApi";
import { FlatList } from "react-native";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useNavigation } from "expo-router";

export default function SearchScreen() {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300); // 300ms bekleme süresi
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const {
    data: filteredListings,
    isLoading,
    error,
  } = useFilterListingsQuery(debouncedQuery || skipToken);

  return (
    <View>
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
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Feather name="mic" size={20} color="black" style={styles.micIcon} />
        <Ionicons
          name="camera-outline"
          size={24}
          color="black"
          style={styles.camIcon}
        />
      </TouchableOpacity>

      <View style={styles.filterContainer}>
        {isLoading && <Text>Yükleniyor...</Text>}
        {error && <Text>Bir hata oluştu.</Text>}
        {filteredListings && filteredListings.length === 0 && (
          <Text style={styles.emptyText}>Sonuç bulunamadı.</Text>
        )}
        {filteredListings && filteredListings.length > 0 && (
          <FlatList
            style={styles.flatList}
            data={filteredListings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  navigation.navigate("advert-detail", { listing: item })
                }
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

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
    paddingLeft: 40,
  },
  item: {
    padding: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#bfbebb",
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
  filterContainer: {
    padding: 20,
  },
});
