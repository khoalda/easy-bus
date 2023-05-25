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

const tabs = ["Thông tin chung", "Bản đồ", "Các trạm đi qua"];

const BusDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [stops, setStops] = useState({ lat: [], lng: [] });
  const [path, setPath] = useState([]);
  const [stopsLoading, setStopsLoading] = useState(true);
  const [pathLoading, setPathLoading] = useState(true);

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

    const fetchPath = async (url) => {
      setPathLoading(true);
      try {
        const response = await axios.get(url);
        setPath(response.data);
        setPathLoading(false);
      } catch (error) {
        console.log(error)
      } finally {
        setPathLoading(false);
      }
    };

    if (busInfo && busInfo.length > 0 && busInfo[0]) {
      const stopsUrl = `https://easy-bus-backend-production.up.railway.app/stops/${params.id}/${busInfo[0].RouteVarId}`
      const pathUrl = `https://easy-bus-backend-production.up.railway.app/paths/${params.id}/${busInfo[0].RouteVarId}`
      fetchStops(stopsUrl)
      fetchPath(pathUrl)
    }
  }, [busInfo])

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Thông tin chung":
        return (
          <General info={busInfo ?? "Không có dữ liệu"} />
        );

      default:
        return (
          <Specifics
            title={activeTab}
            stops={stops}
            stopsLoading={stopsLoading}
            path={path}
            pathLoading={pathLoading}
          />
        );
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

      {busInfoLoading ? (
        <ActivityIndicator size='large' color={COLORS.primary} />
      ) : busInfoError ? (
        <Text>Đã có lỗi xảy ra</Text>
      ) : busInfo.length === 0 ? (
        <Text>Không có dữ liệu</Text>
      ) : (
        <View style={{ padding: SIZES.medium, paddingBottom: 100, flex: 1 }}>
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
    </SafeAreaView>
  );
};

export default BusDetails;
