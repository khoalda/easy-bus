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
import useFetch from "../../../hook/useFetch";
import axios from "axios";

const BusList = ({ search }) => {
  const { data, isLoading, error } = useFetch("vars", {
    search,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <View style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Đã có lỗi xảy ra</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <PopularBusCard
              bus={item}
              key={`popular-bus-${item.id}`}
              handleNavigate={() => router.push(`find-bus/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};

export default BusList;
