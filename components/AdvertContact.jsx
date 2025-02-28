import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function AdvertContact({ onPress }) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Mesaj Gönder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoButton}>
          <Image
            source={require("../assets/images/category-icons/callhm.jpg")}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    position: "absolute", 
    bottom: 80, 
    left:12,
  },
  button: {
    backgroundColor: "#0b52d6",
    borderRadius: 3,
    width: "42%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoButton: {
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});