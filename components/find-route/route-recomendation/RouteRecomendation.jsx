import { View, Text, ScrollView } from "react-native";
import styles from "./RouteRecomendation.style";
import RouteOption from "./RouteOption";
const RouteRecomendation = ({}) => {
  return (
    <View styles={styles.container}>
      <Text styles={styles.heading}>Tuyến đi</Text>
      <ScrollView>
        <RouteOption />
        <RouteOption />
        <RouteOption />
      </ScrollView>
    </View>
  );
};
export default RouteRecomendation;
