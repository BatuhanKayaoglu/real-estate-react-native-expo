import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";

export default function AdvertCard({ listing }) {
  const formattedPrice = new Intl.NumberFormat("tr-TR").format(listing.price);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("advert-detail", { listing })}
    >
      <Image
        style={styles.image}
        source={{ uri: `https://picsum.photos/300/180?random=${listing.id}` }}
      />

      <View style={styles.rightContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <View style={styles.locationPriceContainer}>
          <Text style={styles.location}>
            <Entypo name="location-pin" size={21} color="#81878a" />
            {listing.location}
          </Text>
          <Text style={styles.price}>{formattedPrice} TL</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "#81878a",
    borderBottomWidth: 1,
  },
  image: {
    width: 120,
    height: 85,
    borderRadius: 5,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10,
  },
  locationPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  location: {
    fontSize: 12,
    color: "#81878a",
    fontWeight: "bold",
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1386cf",
  },
});
