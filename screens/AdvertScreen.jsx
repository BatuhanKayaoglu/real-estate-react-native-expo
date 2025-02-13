import { StyleSheet, Text, View, Alert } from "react-native";
import { supabaseAuth } from "../supabase/supabaseAuth"; // Supabase'i doğru şekilde import edin
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native"; // useFocusEffect import
import React, { useCallback, useState } from "react";
import AdvertCard from "../components/AdvertCard";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useGetListingsQuery } from "../store/apis/listingApi";
import Modal from "react-native-modal";
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default function AdvertScreen() {
  const navigation = useNavigation();

  const sortingOptions = [
    { id: 1, label: "Gelişmiş sıralama" },
    { id: 2, label: "Fiyata göre (Önce en yüksek)" },
    { id: 3, label: "Fiyata göre (Önce en düşük)" },
    { id: 4, label: "Tarihe göre (Önce en yeni ilan)" },
    { id: 5, label: "Tarihe göre (Önce en eski ilan)" },
    { id: 6, label: "Adrese göre A-Z" },
    { id: 7, label: "Adrese göre Z-A" },
  ];

  // For Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const [selectedOption, setSelectedOption] = useState(null);


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

  const { data: listings, error, isLoading } = useGetListingsQuery();

  console.log(listings);
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
      {listings &&
        listings.map((listing) => (
          <AdvertCard key={listing.id} listing={listing} />
        ))}

      {/* Modal Componenti */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sırala</Text>
          {sortingOptions.map((option) => (
            <View key={option.id} style={styles.radioContainer}>
              <BouncyCheckbox
                isChecked={selectedOption === option.id}
                fillColor="#1688c9"
                unfillColor="#FFFFFF"
                text={option.label}
                textStyle={styles.checkboxText}
                iconStyle={{ borderColor: "#4CAF50" }}
                onPress={() => setSelectedOption(option.id)}
              />
            </View>
          ))}
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Vazgeç</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
