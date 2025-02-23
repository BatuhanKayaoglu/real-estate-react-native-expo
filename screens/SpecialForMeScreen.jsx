import { useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { supabaseAuth } from "../supabase/supabaseAuth";

export default function SpecialForMeScreen() {

    const navigation = useNavigation();

    const handleSignOut = async () => {
      await supabaseAuth.signOut();
      navigation.navigate("Drawer");
    };

  return (
    <ScrollView style={styles.mainContainer}>
      {/* hesap aç / giriş yap  */}
      <View style={styles.container}>
        <Text style={styles.title}>HESAP AÇ / GİRİŞ YAP</Text>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.text}>Hesap Aç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.text}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={handleSignOut}>
          <Text style={styles.text}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>

      {/* İlan Yönetimi  */}
      <View style={styles.container}>
        <Text style={styles.title}>İLAN YÖNETİMİ</Text>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate("user-advert-list")}>
          <Text style={styles.text}>Yayında Olanlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Yayında Olmayanlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>İlan QR Kod ile Fotoğraf Ekleme</Text>
        </TouchableOpacity>
      </View>

      {/* Mesajlar ve bilgilendirmeler  */}
      <View style={styles.container}>
        <Text style={styles.title}>MESAJLAR VE BİLGİLENDİRMELER</Text>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>İlan Mesajları</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Bilgilendirmeler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Ürün Teklifleri</Text>
        </TouchableOpacity>
      </View>

      {/* Favoriler  */}
      <View style={styles.container}>
        <Text style={styles.title}>FAVORİLER</Text>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Size Özel İlanlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate("favourites-list")}>
          <Text style={styles.text}>Favori İlanlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Favori Aramalar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Favori Satıcılar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Karşılaştırma Listesi</Text>
        </TouchableOpacity>
      </View>

      {/* Diğer  */}
      <View style={styles.container}>
        <Text style={styles.title}>DİĞER</Text>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Yardım ve İşlem Rehberi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Sorun / Öneri Bildirimleri</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Hakkında</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Kişisel Verilerin Korunması</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Çerezler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.text}>Dil Tercihi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: "#e1e4e8",
    marginBottom: 15,
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2666bd",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    fontSize: 14,
    color: "#737578",
  },
  touchable: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
});
