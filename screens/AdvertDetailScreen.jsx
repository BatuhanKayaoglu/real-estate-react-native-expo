import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import AdvertContact from "../components/AdvertContact";
import { useNavigation } from "expo-router";

export default function AdvertDetailScreen({ route }) {
  const { listing } = route.params;

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1  }}>
      <Text style={styles.titleTop}>{listing.title}</Text>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 90 }}
        >
          <Image
            style={styles.image}
            source={{
              uri: `https://picsum.photos/300/180?random=${listing.id}`,
            }}
          />

          <View style={styles.topInfo}>
            <Text style={styles.title}>LION EMLAK REAL ESTATE</Text>
            <Text style={styles.categoryList}>
              Emlak &gt; Satılık &gt; Daire
            </Text>
            <Text style={styles.location}>
              Balıkesir, Bandırma, 655 Evler Mah.
            </Text>
          </View>

          <View style={styles.infoButtons}>
            <TouchableOpacity style={[styles.button, styles.infoTitles]}>
              <Text style={styles.buttonText}>İlan Bilgileri</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.infoTitles]}>
              <Text style={styles.buttonText}>Açıklama</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.infoTitles]}>
              <Text style={styles.buttonText}>Konumu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoMainContainer}>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Fiyat</Text>
              <Text style={styles.infoAnswer}>1.550.000 TL</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>İlan Tarihi</Text>
              <Text style={styles.infoAnswer}>08.02.2025</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>İlan No</Text>
              <Text style={styles.infoAnswer}>12233434013</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Emlak Tipi</Text>
              <Text style={styles.infoAnswer}>Satılık Daire</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>m² Brüt</Text>
              <Text style={styles.infoAnswer}>70</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>m² Net</Text>
              <Text style={styles.infoAnswer}>65</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Oda Sayısı</Text>
              <Text style={styles.infoAnswer}>1+1</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Bina Yaşı</Text>
              <Text style={styles.infoAnswer}>3</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Bulunduğu Kat</Text>
              <Text style={styles.infoAnswer}>Yüksek Giriş</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Kat Sayısı</Text>
              <Text style={styles.infoAnswer}>3</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Isıtma</Text>
              <Text style={styles.infoAnswer}>Kombi - Doğalgaz</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Banyo Sayısı</Text>
              <Text style={styles.infoAnswer}>1</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Mutfak</Text>
              <Text style={styles.infoAnswer}>Açık Amerikan</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Balkon</Text>
              <Text style={styles.infoAnswer}>Var</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Asansör</Text>
              <Text style={styles.infoAnswer}>Var</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Otopark</Text>
              <Text style={styles.infoAnswer}>Açık Otopark</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Eşyalı</Text>
              <Text style={styles.infoAnswer}>Boş</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Krediye Uygun</Text>
              <Text style={styles.infoAnswer}>Evet</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Tapu Durumu</Text>
              <Text style={styles.infoAnswer}>Tapu Mülkiyetli</Text>
            </View>
            <View style={styles.infoMain}>
              <Text style={styles.infoQuestion}>Takas</Text>
              <Text style={styles.infoAnswer}>Evet</Text>
            </View>
          </View>

          <Text style={styles.featureTitle}>ÖZELLİKLER</Text>

          <View style={styles.featuresContainer}>
            <View style={styles.features}>
              <Text style={styles.featureTextTitle}>Cephe</Text>
              <Text style={styles.featureTextDesc}>Doğu, Güney</Text>
            </View>
            <View style={styles.features}>
              <Text style={styles.featureTextTitle}>İç Özellikler</Text>
              <Text style={styles.featureTextDesc}>
                ADSL, Amerikan Kapı, Çelik Kapı, Duşakabin, Fiber, İnternet,
                Görüntülü Diafon, Banyo, Isıcam, Laminant Zemin, Mutfak,Parke
                Zemin, PCV Doğrama
              </Text>
            </View>
            <View style={styles.features}>
              <Text style={styles.featureTextTitle}>Dış Özellikler</Text>
              <Text style={styles.featureTextDesc}>
                Isı Yalıtımı, Kablo TV, Siding, Uydu
              </Text>
            </View>
            <View style={styles.features}>
              <Text style={styles.featureTextTitle}>Muhit</Text>
              <Text style={styles.featureTextDesc}>
                Alışveriş Merkezi, Belediye, Eczane, Eğlence Merkezi,
                İlkokul-Ortaokul, Lise, Market, Park, Polis, Sağlık Ocağı, Şehir
                Merkezi
              </Text>
            </View>
            <View style={styles.features}>
              <Text style={styles.featureTextTitle}>Ulaşım</Text>
              <Text style={styles.featureTextDesc}>
                Anayol, Cadde, Dolmuş, Minibüs, Otobüs Durağı, Sahil, Tren
                İstasyonu
              </Text>
            </View>
            <View style={styles.features}>
              <Text style={styles.featureTextTitle}>Manzara</Text>
              <Text style={styles.featureTextDesc}>
                Doğa Park, Yeşil Alan, Şehir, Bahçe
              </Text>
            </View>
          </View>
        </ScrollView>
        <AdvertContact
          onPress={() =>
            navigation.navigate("messages", {
              listingId: listing.id,
              recipientId: listing.user_id,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  topInfo: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1d5dc4",
  },

  categoryList: {
    color: "#1d5dc4",
    marginBottom: 5,
  },

  location: {
    color: "#a2acbd",
  },
  infoButtons: {
    flexDirection: "row",
    borderBottomWidth: 3,
    borderBottomColor: "#e8b535",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  infoTitles: {
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 5,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#c5c9d1",
    borderBottomColor: "white",
  },
  infoMainContainer: {
    padding: 14,
    paddingBottom: 0,
  },
  infoMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#c5c9d1",
  },
  infoQuestion: {
    color: "#575654",
    fontSize: 16,
    marginBottom: 6,
  },
  infoAnswer: {
    color: "#575654",
    fontSize: 16,
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 16,
    padding: 10,
    textAlign: "left",
    backgroundColor: "#f2f2f2",
    color: "#575654",
  },
  featuresContainer: {
    padding: 10,
  },
  features: {
    gap: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#c5c9d1",
    marginBottom: 10,
    paddingVertical: 10,
  },
  featureTextTitle: {
    fontSize: 15,
  },
  featureTextDesc: {
    color: "#575654",
    fontSize: 15,
  },
  titleTop: {
    fontSize: 20,
    padding: 10,
    color: "black",
    textAlign: "center",
    backgroundColor: "#e6e3e1",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
