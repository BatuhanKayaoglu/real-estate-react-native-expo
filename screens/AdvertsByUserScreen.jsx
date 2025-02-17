import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabaseAuth } from "../supabase/supabaseAuth";
import { useGetListingsByUserQuery } from "../store/apis/listingApi";
import AdvertCard from "../components/AdvertCard";
import SpinnerLoader from "../components/Spinner";

export default function AdvertsByUserScreen() {
  const [activeTab, setActiveTab] = useState("active-listings");
  const [userId, setUserId] = useState(null);
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

  const { data, error, isFetching, isLoading } = useGetListingsByUserQuery(
    { userId },
    { skip: !userId }
  );

  const activeListingsCount =
    data?.filter((listing) => listing.active === true).length || 0;
  const inactiveListingsCount =
    data?.filter((listing) => listing.active === false).length || 0;

  const renderContent = () => {
    if (isFetching || isLoading) {
      return (
        <SpinnerLoader
          visible={true}
          textContent="Yükleniyor..."
          overlayColor="rgba(0, 0, 0, 0.5)"
        />
      );
    }

    if (isFetching || isLoading) return <SpinnerLoader />;

    if (!data || data.length === 0)
      return <Text>İlanınız Bulunmamaktadır...</Text>;

    // Aktif veya pasif ilanları filtrele
    const filteredData = data.filter((listing) =>
      activeTab === "active-listings"
        ? listing.active === true
        : listing.active === false
    );

    return (
      <View style={{ flex: 1 }}>
        {filteredData.map((listing) => (
          <AdvertCard key={listing.id} listing={listing} />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, marginTop: 40 }}>
      {/* Üst Menü */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab("active-listings")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "active-listings" && styles.activeTab,
            ]}
          >
            Yayındaki İlanlarım ({activeListingsCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("inactive-listings")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "inactive-listings" && styles.activeTab,
            ]}
          >
            Yayında Olmayan İlanlarım ({inactiveListingsCount})
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
