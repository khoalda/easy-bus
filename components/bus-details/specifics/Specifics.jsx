import { View, Text, ActivityIndicator } from "react-native";
import styles from "./Specifics.style";
import { COLORS, SIZES } from "../../../constants";
import Tracking from "../../find-route/tracking/Tracking";
import { path as mockPath } from "../../../constants/mockData";

const Specifics = ({ title, stops, pointsLoading, path, pathLoading }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>

      {pointsLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : !stops || stops.length === 0 ? (
        <Text>Không có dữ liệu</Text>
      ) : title === "Các trạm đi qua" ? (
        // TODO: bug chỗ này k scroll được
        <View style={styles.pointsContainer}>
          {stops?.map((item, index) => (
            <View style={styles.pointWrapper} key={index}>
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>{item.Name}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Tracking
          points={stops}
          path={path.lat.map((lat, index) => ({
            latitude: lat,
            longitude: path.lng[index],
          }))}
        />
      )}
    </View>
  );
};

export default Specifics;
