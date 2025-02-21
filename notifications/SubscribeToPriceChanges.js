import { supabase } from '../supabase/supabaseClient';
import { sendPushNotification } from './services/notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage'

// Öncelikle Database --> Publications kısmından CRUD realtime işlemlerini etkinleştirmeniz gerekmektedir.
export const subscribeToPriceChanges = () => {
  const channel = supabase
    .channel('price_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'listings',
      },
      async (payload) => {
        const userId = await AsyncStorage.getItem('userId');
        const updatedListing = payload.new;

        // Kullanıcının favori ilanını kontrol et
        const { data: favorite, error } = await supabase
          .from('favorites')
          .select('*')
          .eq('listing_id', updatedListing.id)
          .eq('user_id', userId)
          .single();

        if (favorite && updatedListing.price < updatedListing.old_price) {
          // Fiyat düştüyse bildirim gönder
          await sendPushNotification(
            userId,
            'Favori İlanında Fiyat Düşüşü!',
            `Bir favori ilanının fiyatı ${updatedListing.old_price}₺'den ${updatedListing.price}₺'ye düştü.`
          );
        }
      }
    )
    .subscribe();

  return channel;
};
