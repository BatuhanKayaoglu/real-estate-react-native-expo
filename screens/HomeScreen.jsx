import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SearchComponent from '../components/Search'
import HomeList from '../components/HomeList'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import  {sendPushNotification}  from '../notifications/services/notificationService'
import { supabaseAuth } from "../supabase/supabaseAuth";
import { registerPushToken } from '../notifications/services/notificationService';
export default function HomeScreen() {

  useEffect(() => {
    const getPushToken = async () => {
      try {
      const user = await supabaseAuth.getUser();
        const userId = "28a4ddff-4ddc-48ce-bcca-6f841f21b412"; 
        await registerPushToken(userId);
        console.log('Push token kaydedildi');
      } catch (error) {
        console.error('Push token kaydedilemedi:', error);
      }
    };

    getPushToken();
  }, []); 

  const handleSendNotification = async () => {
    try {
      await sendPushNotification('28a4ddff-4ddc-48ce-bcca-6f841f21b412', 'Bildirim Başlığı', 'Bu bir test bildirimidir.');
      alert('Bildirim Gönderildi');
    } catch (error) {
      console.error(error);
      alert('Bildirim Gönderilemedi');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SearchComponent />
      <TouchableOpacity onPress={handleSendNotification}><Text>Bildirim gönder</Text></TouchableOpacity>
      <HomeList />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
