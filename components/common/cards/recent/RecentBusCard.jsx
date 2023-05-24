import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./RecentBusCard.style";
import { convertToTime } from "../../../../utils";

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
          {convertToTime(item?.dateStart)}-{convertToTime(item?.dateEnd)}{" "}
          </Text>
          <Text style={styles.location}>{`(${item?.price} VND)`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentBusCard;
