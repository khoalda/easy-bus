import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { COLORS, icons, SIZES, FONT } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import { useRouter, Link, useSearchParams } from "expo-router";
import styles from "../../components/bus-details/specifics/Specifics.style";
import BusMap from "../../components/find-route/bus-map/BusMap";

const RouteDetail = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    if (params && params.route) {
      setData(JSON.parse(params.route));
    }
  }, [params]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Chi tiết chuyến đi",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
        }}
      />

      {data ? (
        <View
          style={{ ...styles.container, backgroundColor: COLORS.lightWhite }}
        >
          <Text
            style={{
              fontSize: SIZES.large,
              color: COLORS.tertiary,
              fontFamily: FONT.bold,
            }}
          >
            {data.Title}
          </Text>

          <Text
            style={{
              fontSize: SIZES.medium,
              color: COLORS.primary,
              fontFamily: FONT.bold,
            }}
          >
            {data.Desc}
          </Text>

          <BusMap
            points={data.stops}
            type="multiple"
            path={data.coordRoute}
          />

          <FlatList
            style={{ flex: 1 }}
            data={data.stops}
            renderItem={({ item }) => (
              <View style={styles.pointWrapper}>
                <View style={styles.pointDot} />
                <Text style={styles.pointText}>{item.Name}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

export default RouteDetail;
