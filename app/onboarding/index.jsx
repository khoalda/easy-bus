import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import slides from "../../constants/slides";
import OnboardingItem from "../../components/onboarding/OnboardingItem";
import Paginator from "./Paginator";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants";
import { StyleSheet } from "react-native";


export default Onboarding = () => {
  const handleOnboardingComplete = () => {
    AsyncStorage.setItem("onboardingCompleted", "true");
    console.log("handled Onboarding");
  };

  const router = useRouter();
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginLeft: "auto",
    text: {
      color: "#F28624",
      fontSize: 16,
    },
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 15,
    borderRadius: 5,
    marginRight: 50,
    width: 130,

    alignItems: "center",
    justifyContent: "center",
    text: {
      color: "#F28624",
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  nextButton: {
    backgroundColor: "#F28624",
    paddingVertical: 15,
    borderRadius: 5,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    text: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  },
});
