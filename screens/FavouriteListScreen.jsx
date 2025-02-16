import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabaseAuth } from "../supabase/supabaseAuth";
import { useGetFavouritesByUserQuery } from "../store/apis/favouriteApi";
import AdvertCard from "../components/AdvertCard";

export default function FavouriteListScreen() {
  const [activeTab, setActiveTab] = useState("listings");
  const [userId, setUserId] = useState(null); // Kullanıcı ID'sini burada saklıyoruz
  const navigation = useNavigation();

  // Kullanıcıyı al ve state'e kaydet
  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabaseAuth.getUser();
      if (error || user === "null") {
        Alert.alert("Giriş Yapmanız Gerekiyor", "Lütfen giriş yapınız.", [
          { text: "Tamam", onPress: () => navigation.navigate("Login") },
        ]);
        return;
      }
      setUserId(user.id);
    };

    fetchUser();
  }, []);

  const { data, error } = useGetFavouritesByUserQuery(
    { userId },
    { skip: !userId }
  );

  const renderContent = () => {
    if (activeTab === "listings") {
      return (
        <View style={{ flex: 1 }}>
          {data && data.length > 0 ? (
            data.map((listing) => (
              <AdvertCard key={listing.id} listing={listing.listings} />
            ))
          ) : (
            <Text>Henüz favori ilanınız yok.</Text>
          )}
        </View>
      );
    }
    if (activeTab === "searches") return <Text>Favori Aramalar</Text>;
    if (activeTab === "sellers") return <Text>Favori Satıcılar</Text>;
    return null;
  };

  return (
    <ScrollView style={{ flex: 1, marginTop: 40 }}>
      {/* Üst Menü */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab("listings")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "listings" && styles.activeTab,
            ]}
          >
            Favori İlanlar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("searches")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "searches" && styles.activeTab,
            ]}
          >
            Favori Aramalar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("sellers")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "sellers" && styles.activeTab,
            ]}
          >
            Favori Satıcılar
          </Text>
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </ScrollView>
  );
}

const styles = {
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    paddingVertical: 8,
  },
  activeTab: {
    color: "#4286bd",
    borderBottomWidth: 3,
    borderBottomColor: "#4286bd",
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: "center",
  },
};
