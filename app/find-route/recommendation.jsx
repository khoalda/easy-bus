import { View, Text, SafeAreaView } from "react-native";
import { Stack, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { COLORS, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import { useRouter, Link } from "expo-router";
import RouteCard from "../../components/find-route/route-card/RouteCard";
import RouteRecomendation from "../../components/find-route/route-recomendation/RouteRecomendation";
import axios from "axios";

const Recommendation = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async (url) => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setRecommendations(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (params && params.query) {
      const url = `https://easy-bus-backend-production.up.railway.app/pathfinding/byPos/${params.query}`;
      fetchRecommendations(url);
    }
  }, [params]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Chọn chuyến bạn muốn đi",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
        }}
      />
      <RouteRecomendation recommendations={recommendations} loading={loading} />
    </SafeAreaView>
  );
};

export default Recommendation;
