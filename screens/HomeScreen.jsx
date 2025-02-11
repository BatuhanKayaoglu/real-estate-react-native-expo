import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchComponent from '../components/Search'
import HomeList from '../components/HomeList'
import { ScrollView } from 'react-native'

export default function HomeScreen() {

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
