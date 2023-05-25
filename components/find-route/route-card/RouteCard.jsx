import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./RouteCard.style";

const RouteCard = ({}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={require("../../../assets/recom_path.png")} />
      <View>
        <TouchableOpacity style={styles.infoWrapper}>
          <Text style={styles.heading}>Điểm đi</Text>
          <Text style={styles.text}>Bách khoa CS1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoWrapper}>
          <Text style={styles.heading}>Điểm đến</Text>
          <Text style={styles.text}>Bách khoa CS2</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.image}>
          <Image source={require("../../../assets/recom_cancel.png")} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.image}>
          <Image source={require("../../../assets/recom_change.png")} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default RouteCard;
