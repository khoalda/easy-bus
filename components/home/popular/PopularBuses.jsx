import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./PopularBuses.style";
import { COLORS } from "../../../constants";
import PopularBusCard from "../../common/cards/nearby/PopularBusCard";
import useFetch from "../../../hook/useFetch";
import { jobList } from "../../../constants/mockData";

const PopularBuses = () => {
  const router = useRouter();
  // const { data, isLoading, error } = useFetch("search", {
  //   query: "React Native developer",
  //   num_pages: "1",
  // });

  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Các tuyến phổ biến</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          jobList?.map((job) => (
            <PopularBusCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/bus-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default PopularBuses;
