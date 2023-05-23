import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Tabs, Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../constants";
import {
  PopularBuses,
  RecentBuses,
  ScreenHeaderBtn,
  Welcome,
} from "../../components";

const Home = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/find-route/${searchTerm}`)
              }
            }}
          />

          <RecentBuses />
          <PopularBuses />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
