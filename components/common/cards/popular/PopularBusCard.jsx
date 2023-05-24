import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./PopularBusCard.style";
import { checkImageURL } from "../../../../utils";

const PopularBusCard = ({ bus, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Text style={styles.logImage}>{bus?.no}</Text>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {"Xe số " + bus?.no}
        </Text>

        <Text style={styles.jobType}>{bus?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularBusCard;
