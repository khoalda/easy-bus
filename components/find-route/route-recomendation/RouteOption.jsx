import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./RouteOption.style";
const RouteOption = ({}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>23 phút, 1 chuyến</Text>
        <View style={styles.nameContainer}>
          <Text>Xe 50</Text>
          <Text>Bách khoa, CS2</Text>
        </View>
      </View>
      <View styles={styles.pathContainer}>
        <View>
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
