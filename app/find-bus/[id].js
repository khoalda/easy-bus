import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Logo,
  General,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import axios from "axios";

const tabs = ["Thông tin chung", "Các trạm đi qua", "Bản đồ"];

const BusDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [stops, setStops] = useState([]);
  const [stopsLoading, setStopsLoading] = useState(true);

  const { data: busInfo, isLoading: busInfoLoading, error: busInfoError, refetch: refetchBusInfo } = useFetch(`vars/${params.id}`);

  useEffect(() => {
    const fetchStops = async (url) => {
      setStopsLoading(true);
      try {
        const response = await axios.get(url);
        setStops(response.data);
        setStopsLoading(false);
      } catch (error) {
        console.log(error)
      } finally {
        setStopsLoading(false);
      }
    };

    if (busInfo && busInfo.length > 0 && busInfo[0]) {
      const url = `https://easy-bus-backend-production.up.railway.app/stops/${params.id}/${busInfo[0].RouteVarId}`
      fetchStops(url)
    }
  }, [busInfo])

  useEffect(() => {
    console.log(stops)
  }, [stops])

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchBusInfo()
    setRefreshing(false)
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Thông tin chung":
        return (
          <General info={busInfo ?? "Không có dữ liệu"} />
        );

      case "Các trạm đi qua":
        return (
          <Specifics
            title='Các trạm đi qua'
            data={stops}
            isLoading={stopsLoading}
          />
        );

      case "Bản đồ":
        return (
          <Specifics
            title='Bản đồ'
            data={stops}
            isLoading={stopsLoading}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {busInfoLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : busInfoError ? (
            <Text>Đã có lỗi xảy ra</Text>
          ) : busInfo.length === 0 ? (
            <Text>Không có dữ liệu</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Logo
                no={busInfo[0].RouteNo}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        {/* <JobFooter url={busInfo[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} /> */}
      </>
    </SafeAreaView>
  );
};

export default BusDetails;
