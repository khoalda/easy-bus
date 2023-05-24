import { Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();
import { SplashScreen } from "expo-router";


export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        headerShown: false,
        gestureEnabled: false,
      }} />
      <Stack.Screen name="onboarding/index" options={{
        headerShown: false
      }} />
      <Stack.Screen name="find-route/recommendation" options={{
        // headerShown: false,
        presentation: "modal"
      }} />
      <Stack.Screen name="find-route/route-detail" options={{
        // headerShown: false,
        presentation: "modal"
      }} />
    </Stack>
  )
};

export default Layout;
