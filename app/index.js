import { Redirect, SplashScreen } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("onboardingCompleted").then((value) => {
      if (value) {
        setShowOnboarding(false);
      }
    });
  }, []);

  return (
    <>
      {showOnboarding ? (
        <Redirect href="/onboarding" />
      ) : (
        <Redirect href="/home" />
      )}
    </>
  );
}
