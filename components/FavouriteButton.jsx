import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import {
  useAddFavouriteByUserMutation,
  useGetFavouritesByUserQuery,
  useRemoveFavouriteMutation,
} from "../store/apis/favouriteApi";
import { supabaseAuth } from "../supabase/supabaseAuth";
import { useEffect, useState } from "react";

export default function FavouriteButton({ advertId }) {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  // Kullanıcı ID'sini al
  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabaseAuth.getUser();
      user && setUserId(user.id);
    };
    fetchUser();
  }, []);

  // Favori verilerini çek
  const { data: favouritesData, refetch } = useGetFavouritesByUserQuery(
    { userId },
    { skip: !userId }
  );

  // Favori durumunu kontrol et
  useEffect(() => {
    if (favouritesData?.length > 0) {
      const existingFavorite = favouritesData.find(
        (item) => item.listing_id === advertId
      );

      if (existingFavorite) {
        setIsFavorite(true);
        setFavoriteId(existingFavorite.id);
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    }
  }, [favouritesData, advertId]);

  const [addFavourite] = useAddFavouriteByUserMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  const handleFavoriteToggle = async () => {
    const user = await supabaseAuth.getUser();

    try {
      if (user === null) {
        Alert.alert("Giriş Yapmanız Gerekiyor", "Lütfen giriş yapınız.", [
          { text: "Tamam", onPress: () => navigation.navigate("Login") },
        ]);
        return;
      }

      if (isFavorite) {
        await removeFavourite({ favouriteId: favoriteId }).unwrap();
      } else {
        await addFavourite({ userId, listingId: advertId }).unwrap();
      }

      // Optimistik güncelleme
      setIsFavorite(!isFavorite);
      // Verileri yeniden çek
      refetch();
    } catch (error) {
      console.error("İşlem hatası:", error);
      setIsFavorite((prev) => !prev);
    }
  };

  return (
    <TouchableOpacity onPress={handleFavoriteToggle}>
      <Entypo
        name={isFavorite ? "star" : "star-outlined"}
        size={26}
        color={isFavorite ? "#FFD700" : "#FFFFFF"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
