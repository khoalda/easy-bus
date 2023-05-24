import { View, Text } from "react-native";

import styles from "./About.style";
import { calculateAverage, getOrderedTime } from "../../../utils";

const About = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Thông tin chung:</Text>

      <View style={styles.pointsContainer}>
        <View style={styles.pointWrapper}>
          <View style={styles.pointDot} />
          <Text style={styles.pointText}>
            Tên tuyến: {info[0].EndStop + " - " + info[1].EndStop}
          </Text>
        </View>

        <View style={styles.pointWrapper}>
          <View style={styles.pointDot} />
          <Text style={styles.pointText}>
            Cự ly: {calculateAverage(info[0].Distance, info[1].Distance)} km
          </Text>
        </View>

        <View style={styles.pointWrapper}>
          <View style={styles.pointDot} />
          <Text style={styles.pointText}>
            Thời gian di chuyển:{" "}
            {getOrderedTime(info[0].RunningTime, info[1].RunningTime)} phút
          </Text>
        </View>
      </View>
    </View>
  );
};

export default About;
