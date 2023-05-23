import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import slides from "./slides";
import OnboardingItem from "./OnboardingItem.jsx";
import Paginator from "./Paginator";
import styles from "./onboarding.style";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants";

export default Onboarding = () => {
  const handleOnboardingComplete = () => {
    AsyncStorage.setItem("onboardingCompleted", "true");
    console.log("handled Onboarding");
  };
  const router = useRouter();
  console.log("onboarding");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const onPressGoNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < 3) {
      slidesRef.current.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      handleOnboardingComplete();
      router.push("home");
    }
  };

  const onPressGoBack = () => {
    const nextIndex = currentIndex - 1;
    if (nextIndex >= 0) {
      slidesRef.current.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    }
  };

  const onPressGoHome = () => {
    handleOnboardingComplete();
    router.push("home");
  };

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressGoHome} style={styles.skipButton}>
          <Text style={styles.skipButton.text}>Bỏ qua</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <FlatList
            data={slides}
            renderItem={({ item }) => (
              <OnboardingItem
                item={item}
                data={slides}
                scrollX={scrollX}
                currentIndex={currentIndex}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          ></FlatList>
        </View>

        <Paginator data={slides} scrollX={scrollX}></Paginator>

        <View style={styles.navContainer}>
          <TouchableOpacity onPress={onPressGoBack} style={styles.backButton}>
            <Text style={styles.backButton.text}>
              {currentIndex === 0 ? "" : "Quay lại"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressGoNext} style={styles.nextButton}>
            <Text style={styles.nextButton.text}>
              {currentIndex === 2 ? "Hoàn thành" : "Tiếp tục"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
