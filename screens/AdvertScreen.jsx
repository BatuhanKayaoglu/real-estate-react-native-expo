import { StyleSheet, Text, View, Alert } from "react-native";
import { supabaseAuth } from "../supabase/supabaseAuth"; 
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native"; 
import React, { useCallback, useState } from "react";
import AdvertCard from "../components/AdvertCard";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useGetListingsQuery } from "../store/apis/listingApi";
import { useGetListingsByParamsQuery } from "../store/apis/listingApi";
import SortingModal from "../components/SortedModal";

export default function AdvertScreen() {
  const navigation = useNavigation();

  const sortingOptions = [
    { sorted: "price", label: "Gelişmiş sıralama" },
    { sorted: "price-desc", label: "Fiyata göre (Önce en yüksek)" },
    { sorted: "price-asc", label: "Fiyata göre (Önce en düşük)" },
    { sorted: "created_at-desc", label: "Tarihe göre (Önce en yeni ilan)" },
    { sorted: "created_at-asc", label: "Tarihe göre (Önce en eski ilan)" },
    { sorted: "title-asc", label: "Adrese göre A-Z" },
    { sorted: "title-desc", label: "Adrese göre Z-A" },
  ];

  // For Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const [selectedOption, setSelectedOption] = useState(null);


  // Kullanıcı girişi yapılmadığında uyarı vermeyi sağlayan fonksiyon
  const checkUser = async () => {
    const user = await supabaseAuth.getUser();
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

  // Sıralama için data (selectedOption varsa çalışacak)
  const getSortParams = (option) => {
    if (!option) return { column: null, order: null }; 
    const [column, order] = option.split("-"); // Örneğin: "price-asc" -> ["price", "asc"]
    return { column, order };
  };

  const { data: listings, error, isLoading } = useGetListingsQuery();

  const { column, order } = getSortParams(selectedOption);

  const {
    data: filteredListings,
    error: filteredError,
    isLoading: filteredIsLoading,
  } = useGetListingsByParamsQuery(
    { column, order },
    { skip: !selectedOption } // ✅ Seçili değilse sorguyu atla
  );

  const listingsToShow = selectedOption ? filteredListings : listings;

  return (
    <ScrollView styles={styles.container}>
      <View style={styles.mainFilterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filtrele</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={openModal}>
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
      {listingsToShow &&
        listingsToShow.map((listing) => (
          <AdvertCard key={listing.id} listing={listing} />
        ))}

      {/* Modal Componenti */}
      <SortingModal
        isVisible={isModalVisible}
        onClose={closeModal}
        options={sortingOptions}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#d3d8db",
    borderBottomColor: "#81878a",
    borderBottomWidth: 3,
  },

  filterText: {
    color: "#333",
    fontSize: 12,
  },
  filterButton: {
    borderRightColor: "#81878a",
    borderRightWidth: 1,
    paddingRight: 25,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  radioContainer: {
    marginVertical: 5,
    width: "100%",
  },
  checkboxText: {
    fontSize: 16,
    textDecorationLine: "none",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#1688c9",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
