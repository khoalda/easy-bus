import { Redirect, SplashScreen } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'YOUR DSN HERE',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(true);
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
