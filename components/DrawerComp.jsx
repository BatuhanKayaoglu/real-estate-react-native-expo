import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import HeaderRight from "./HeaderRight";
import { useGetDrawersQuery } from "../store/apis/drawerApi";
import { Text, View, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import icon from "../icon";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import SpecialForMeScreen from "../screens/SpecialForMeScreen";

const Drawer = createDrawerNavigator();

export default function DrawerComp() {
  const { data, error, isLoading } = useGetDrawersQuery();

  if (isLoading) {
    return <Text>Loading...</Text>; // Yükleniyor mesajı
  }

  if (error) {
    return <Text>Error loading data</Text>; // Hata mesajı
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0077CC" },
        headerRight: () => <HeaderRight />,
        headerTintColor: "#fff",
        drawerStyle: {
          backgroundColor: "#fff",
          width: 335 ,
        },
        drawerActiveTintColor: "#0077CC",
        drawerInactiveTintColor: "#B0B3B8",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Sahibinden.com",
          drawerLabel: () => (
            <View style={styles.drawerItem}>
              <Text style={styles.drawerLabel}>Sahibinden.com</Text>
              <View style={styles.drawerLine} />
            </View>
          ),
          drawerIcon: () => <Image
          source={require("../assets/images/category-icons/main-icon.png")} 
          style={{width: 20, height: 20}}
        />,
        }}
      />
      {/* <Drawer.Screen
        name="Test"
        component={HomeScreen}
        options={{
          title: "Sign In",
          drawerLabel: () => (
            <View style={styles.drawerItem}>
              <Text style={styles.drawerLabel}>İlan Ver</Text>
              <View style={styles.drawerLine} />
            </View>
          ),
          drawerIcon: () => <Entypo name="plus" size={24} color="black" />
        }}
      /> */}
      <Drawer.Screen
        name="SpecialForMe"
        component={SpecialForMeScreen}
        options={{
          title: "Bana Özel",
          drawerLabel: () => (
            <View style={styles.drawerItem}>
              <Text style={styles.drawerLabel}>Bana Özel</Text>
              <View style={styles.drawerLine} />
            </View>
          ),
          drawerIcon: () => <AntDesign name="user" size={24} color="black" />,
        }}
      />

      {/* Dinamik olarak gelen verilerle ekranları render ediyoruz */}
      {data &&
        data.map((item) => (
          <Drawer.Screen
            key={item.id}
            name={item.title}
            component={HomeScreen}
            options={{
              title: item.title,
              drawerLabel: () => (
                <View style={styles.drawerItem}>
                  <Text
                    style={styles.drawerLabel}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={styles.description}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.description}
                  </Text>
                  <View style={styles.drawerLine} />
                </View>
              ),
              drawerIcon: () => (
                <Image
                  source={icon[item.image]} // icons nesnesinden dinamik olarak görseli alıyoruz
                  style={styles.icon}
                />
              ),
            }}
          />
        ))}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawerLabel: {
    fontSize: 17,
    color: "black",
  },
  drawerLine: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    color: "#B0B3B8",
  },
});
