import { View, Text, ActivityIndicator } from "react-native";
import styles from "./Specifics.style";
import { COLORS, SIZES } from "../../../constants";
import Tracking from "../../find-route/tracking/Tracking";
import Map from "../../find-route/map/Map";

const Specifics = ({ title, data, isLoading }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : !data || data.length === 0 ? (
        <Text>Không có dữ liệu</Text>
      ) : title === "Các trạm đi qua" ? (
        <View style={styles.pointsContainer}>
          {data?.map((item, index) => (
            <View style={styles.pointWrapper} key={index}>
              <View style={styles.pointDot} />
              <Text style={styles.pointText}>{item.Name}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Tracking />
      )}
    </View>
  );
};

export default Specifics;
