import { View, Text, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { COLORS, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import { useRouter, Link } from "expo-router";
import RouteCard from "../../components/find-route/route-card/RouteCard";
import RouteRecomendation from "../../components/find-route/route-recomendation/RouteRecomendation";
const Recommendation = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          // headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Chọn chuyến bạn muốn đi",
        }}
      />
      <RouteCard />
      <RouteRecomendation />
      {/* <Text></Text>
      <View>
        <Text>Recommendations</Text>
      </View>

      <Link href="find-route/route-detail">Xe số 8</Link>
      <Link href="find-route/route-detail">Xe số 19</Link>
      <Link href="find-route/route-detail">Xe số 150</Link> */}
    </SafeAreaView>
  );
};

export default Recommendation;
