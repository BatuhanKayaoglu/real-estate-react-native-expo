import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AdvertDetailScreen({route}) {

    const { listing } = route.params; // Gelen veriyi al

  return (
    <View>
      <Text>{listing.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})