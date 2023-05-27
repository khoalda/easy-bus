import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { COLORS, icons, images, SIZES } from "../../constants";
import {
  PopularBuses,
  RecentBuses,
  ScreenHeaderBtn,
  Welcome,
} from "../../components";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome/>
          <RecentBuses />
          <PopularBuses />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
