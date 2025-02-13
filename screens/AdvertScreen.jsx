import { StyleSheet, Text, View, Alert } from "react-native";
import { supabaseAuth } from "../supabase/supabaseAuth"; // Supabase'i doğru şekilde import edin
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native"; // useFocusEffect import
import React, { useCallback } from "react";
import AdvertCard from "../components/AdvertCard";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useGetListingsQuery } from "../store/apis/listingApi";

export default function AdvertScreen() {
  const navigation = useNavigation();

  const checkUser = async () => {
    const user = await supabaseAuth.getUser();
    console.log(user);

    if (!user) {
      Alert.alert("Giriş Yapmanız Gerekiyor", "Lütfen giriş yapınız.", [
        { text: "Tamam", onPress: () => navigation.navigate("Login") },
      ]);
    }
  };

  // Sayfa her odaklandığında (focus) çalışacak
  useFocusEffect(
    useCallback(() => {
      checkUser();
    }, []) // Dependencies array boş bırakılır, çünkü her odaklandığında çalışmasını istiyoruz
  );

  // AdvertCardlarımızın listelenmesini sağlayan component

  const { data: listings, error, isLoading } = useGetListingsQuery();

  console.log(listings);
  return (
    <ScrollView styles={styles.container}>
      <View style={styles.mainFilterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filtrele</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Sırala</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Görünüm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Aramayı Kaydet</Text>
        </TouchableOpacity>
      </View>

      {/* AdvertCardlarımız burada */}
      {listings &&
        listings.map((listing) => (
          <AdvertCard key={listing.id} listing={listing} />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
    },

    mainFilterContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#d3d8db',
        borderBottomColor : "#81878a",
        borderBottomWidth: 3,
    },

    filterText: {
        color: '#333',
        fontSize: 12,
    },

    filterButton: {
        borderRightColor : "#81878a",
        borderRightWidth:1,
        paddingRight: 25,
    }
  
});
