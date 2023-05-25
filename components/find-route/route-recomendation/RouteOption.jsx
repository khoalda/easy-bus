import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./RouteOption.style";
import { useEffect } from "react";
import { useRouter } from "expo-router";

const RouteOption = ({ route }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
    router.push(`find-route/route-detail?route=${JSON.stringify(route)}`);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <Text
        style={{
          fontWeight: 900,
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        {route.Title}
      </Text>
      <Text
        style={{
          marginBottom: 5,
        }}
      >
        {route.Desc}
      </Text>
      <View styles={styles.pathContainer}>
        <View style={{
          marginBottom: 5,

        }}>
          <Image
            source={require("../../../assets/path.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.ticketContainer}>
          <Image source={require("../../../assets/Ticket.png")} />
          <Text>7k VNĐ</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default RouteOption;
