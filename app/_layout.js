import { Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import { COLORS, icons } from "../constants";
import { ScreenHeaderBtn } from "../components"; 

// SplashScreen.preventAutoHideAsync();

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
    return null;
  }

  return (
    // <Stack initialRouteName="home">
    //   <Stack.Screen name="home" />
    // </Stack>
    <Tabs>
      <Tabs.Screen name="index" options={{
        href: null
      }} />
      <Tabs.Screen name="home" options={{
        title: 'Tổng quan',
        headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.logo} dimension='180%' />
          ),
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          // ),
          headerTitle: "Easy Bus",
      }} />
      <Tabs.Screen name="find-route/index" options={{
        title: 'Tìm đường',
      }} />
      <Tabs.Screen name="find-bus/index" options={{
        title: 'Tra cứu',
      }} />
      <Tabs.Screen name="find-route/[id]" options={{
        href: null
      }} />
      <Tabs.Screen name="find-bus/[id]" options={{
        href: null
      }} />
    </Tabs>
  )
};

export default Layout;
