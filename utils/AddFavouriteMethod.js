export const AddFavourite = (advertId) => {
  if (!advertId) {
    console.error("Advert ID bulunamadı!");
    return;
  }

  console.log("Advert ID:", advertId);
  // Burada API çağrısı yapabilir, state güncelleyebilir, ya da başka bir işlem yapabilirsiniz.
};
