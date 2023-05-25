import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import styles from "./RouteRecomendation.style";
import RouteOption from "./RouteOption";

const RouteRecomendation = ({ recommendations, loading }) => {

  return (
    <View styles={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : recommendations.length === 0 ? (
          <Text>Không có dữ liệu</Text>
        ) : (
          recommendations.map((route, index) => {
            return (
              <RouteOption
                key={index}
                route={route}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};
export default RouteRecomendation;
