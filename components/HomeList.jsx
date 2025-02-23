import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import icon from "../icon";
import { useGetDrawersQuery } from "../store/apis/drawerApi";
import SpinnerLoader from "./Spinner";

export default function HomeList() {
  const { data, error, isLoading } = useGetDrawersQuery();

  return (
    <View style={styles.container}>
      {isLoading && <SpinnerLoader
          visible={true}
          textContent="Yükleniyor..."
          overlayColor="rgba(0, 0, 0, 0.5)"
        />}
      {error && <Text>Error loading data</Text>}
      {data &&
        data.map((item) => (
          <TouchableOpacity style={styles.mainContainer} key={item.id}>
            <Image style={styles.image} source={icon[item.image]} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text
                style={styles.description}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>
            </View>
            <FontAwesome5
              name="angle-right"
              size={24}
              color="#75736e"
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
  },
  mainContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "#666",
  },
  rightIcon: {
    position: "absolute",
    right: 10,
    top: 23,
  },
});
