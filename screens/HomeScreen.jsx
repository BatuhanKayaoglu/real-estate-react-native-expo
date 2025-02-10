import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGetUsersQuery } from '../store/apis/authApi'
import SearchComponent from '../components/Search'
import HomeList from '../components/HomeList'

export default function HomeScreen() {

  // if (isLoading) return <Text>Loading...</Text>

  // if (error) return <Text>Error: {error.message || JSON.stringify(error)}</Text>



  return (
    <View styles={styles.container}>
      <SearchComponent />
      <HomeList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#adaca6',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
