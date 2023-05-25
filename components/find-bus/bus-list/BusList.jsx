import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";

import React, { useEffect, useState } from "react";
import styles from "./BusList.style";
import { COLORS, SIZES, icons } from "../../../constants";
import PopularBusCard from "../../common/cards/popular/PopularBusCard";
import useFetch from "../../../hook/useFetch";
import { useRouter } from "expo-router";

const BusList = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data, isLoading, error, refetch } = useFetch("vars", {
    search,
  });
  const handleClick = () => {
    refetch();
  };

  return (
    <>
      <View style={styles.listContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={(text) => setSearch(text)}
              placeholder="Nhập số tuyến hoặc tên tuyến"
              onSubmitEditing={refetch}
            />
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: SIZES.small,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Đã có lỗi xảy ra</Text>
          ) : (
            <FlatList
              data={data.sort((a, b) => Number(a.no) - Number(b.no))}
              renderItem={({ item }) => (
                <PopularBusCard
                  bus={item}
                  key={`popular-bus-${item.id}`}
                  handleNavigate={() => router.push(`find-bus/${item.id}`)}
                />
              )}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                columnGap: SIZES.medium,
                rowGap: SIZES.small,
              }}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default BusList;
