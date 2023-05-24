import { View, Text, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { COLORS, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import { useRouter, Link } from "expo-router";

const RouteDetail = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          // headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Chi tiết chuyến đi",
        }}
      />

      <View>
        <Text>RouteDetail</Text>
      </View>
    </SafeAreaView>
  );
};

export default RouteDetail