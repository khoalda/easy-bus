import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./RecentBusCard.style";
import { checkImageURL } from "../../../../utils";

const RecentBusCard = ({ item, selectedBus, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedBus, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedBus, item)}>
        <Text style={styles.logImage}>{item?.no}</Text>
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item?.name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedBus, item)} numberOfLines={1}>
          Xe số {item?.no}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedBus, item)}>
            5H30 - 19H45{" "}
          </Text>
          <Text style={styles.location}>(7K VND)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentBusCard;
