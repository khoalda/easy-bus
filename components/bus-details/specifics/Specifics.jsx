import { View, Text, ActivityIndicator, FlatList } from "react-native";
import styles from "./Specifics.style";
import { COLORS, SIZES } from "../../../constants";
import BusMap from "../../find-route/bus-map/BusMap";

const Specifics = ({ title, stops, pointsLoading, path, pathLoading }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {pointsLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : !stops || stops.length === 0 ? (
        <Text>Không có dữ liệu</Text>
      ) : title === "Các trạm đi qua" ? (
        <FlatList
          style={{ flex: 1 }}
          data={stops}
          renderItem={({ item }) => (
            <View style={styles.pointWrapper}>
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>{item.Name}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <BusMap
          points={stops}
          type="single"
          path={path.lat?.map((lat, index) => ({
            latitude: lat,
            longitude: path.lng[index],
          }))}
        />
      )}
    </View>
  );
};

export default Specifics;
