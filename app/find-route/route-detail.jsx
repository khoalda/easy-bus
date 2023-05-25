import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { COLORS, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import { useRouter, Link, useSearchParams } from "expo-router";

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
        <View>
          <Text>RouteDetail</Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

export default RouteDetail;
