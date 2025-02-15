// import { useSelector } from "react-redux";
// import {
//   useAddFavouriteByUserMutation,
//   useRemoveFavouriteMutation,
//   useGetFavouritesByUserQuery,
// } from "../store/apis/favouriteApi";

// const [addFavourite] = useAddFavouriteByUserMutation();
// const [deleteFavourite] = useRemoveFavouriteMutation();
// const { data: favouritesData, error, isLoading } = useGetFavouritesByUserQuery(userId);

// const userId = useSelector((state) => state.auth.user.userId);

// export const handleAddFavourite = async (advertId) => {
//   console.log("Favori eklenecek ilan id:", advertId);
//   console.log("Kullanıcı id:", userId);
//   try {
//     const response = await addFavourite({userId, listingId: advertId }).unwrap();
//     console.log("Favori eklendi:", response);
//   } catch (error) {
//     console.error("Favori eklerken hata oluştu:", error);
//   }
// };

// export const handleRemoveFavourite = async () => {
//   try {
//     const response = await deleteFavourite({
//       favouriteId: advertId,
//     }).unwrap();
//     console.log("Favori kaldırıldı:", response);
//   } catch (error) {
//     console.error("Favori kaldırırken hata oluştu:", error);
//   }
// };

// export const getFavouritesForUser = async () => {
//   try {
//     const response = await getFavourites({ userId }).unwrap();
//     console.log("Kullanıcı favorileri:", response);
//   } catch (error) {
//     console.error("Favorileri getirirken hata oluştu:", error);
//   }
// };
