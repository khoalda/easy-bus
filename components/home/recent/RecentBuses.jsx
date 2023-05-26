import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./RecentBuses.style";
import { COLORS, SIZES } from "../../../constants";
import RecentBusCard from "../../common/cards/recent/RecentBusCard";
import useFetch from "../../../hook/useFetch";
import { busList } from "../../../constants/mockData";

const RecentBuses = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState(false);
  const [selectedBus, setSelectedBus] = useState("26_1");

  const handleCardPress = (item) => {
    router.push(`find-bus/${item.id}`);
    setSelectedBus(item.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Các tuyến đi gần đây</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Đã có lỗi xảy ra</Text>
        ) : (
          <FlatList
            data={busList}
            renderItem={({ item }) => (
              <RecentBusCard
                item={item}
                selectedBus={selectedBus}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default RecentBuses;
