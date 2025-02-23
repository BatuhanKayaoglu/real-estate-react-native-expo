import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useFilterListingsQuery } from "../store/apis/listingApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useNavigation } from "expo-router";
import SearchBar from "../components/SearchBar";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");

  const {
    data: filteredListings,
    isLoading,
    error,
  } = useFilterListingsQuery(query || skipToken);

  return (
    <View>
      <SearchBar onSearch={setQuery} />

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
  filterContainer: {
    padding: 20,
  },
});
