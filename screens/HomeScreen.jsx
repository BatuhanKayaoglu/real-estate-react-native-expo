import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SearchComponent from '../components/Search'
import HomeList from '../components/HomeList'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { subscribeToPriceChanges } from '../notifications/SubscribeToPriceChanges';

export default function HomeScreen() {

  // useEffect(() => {
  //   const getPushToken = async () => {
  //     try {
  //       const storedUserId  = await AsyncStorage.getItem('userId');
  //       await registerPushToken(storedUserId);
  //     } catch (error) {
  //       console.error('Push token kaydedilemedi:', error);
  //     }
  //   };

  //   getPushToken();
  // }, []); 

  useEffect(() => {
    const subscription = subscribeToPriceChanges();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <SearchComponent />
      <HomeList />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
