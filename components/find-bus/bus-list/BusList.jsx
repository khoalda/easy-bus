import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import React, { useEffect, useState } from "react";
import styles from "./BusList.style";
import { jobList } from "../../../constants/mockData";
import { COLORS, SIZES } from "../../../constants";
import PopularBusCard from "../../common/cards/popular/PopularBusCard";

const BusList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState(false);

  return (
    <View style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Đã có lỗi xảy ra</Text>
      ) : (
        <FlatList
          data={jobList}
          renderItem={({ item }) => (
            <PopularBusCard
              job={item}
              key={`popular-bus-${item.job_id}`}
              handleNavigate={() => router.push(`find-bus/${item.job_id}`)}
            />
          )}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};

export default BusList;
