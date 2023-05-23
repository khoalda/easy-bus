import { Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import { COLORS, icons } from "../constants";
import { ScreenHeaderBtn } from "../components";
import { FontAwesome } from '@expo/vector-icons'; 

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
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.tertiary,
      tabBarInactiveTintColor: COLORS.gray,
    }} >
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
        tabBarIcon: ({ color }) => {
          return <FontAwesome name="home" size={20} color={color} />
        },
      }} />
      <Tabs.Screen name="find-route" options={{
        title: 'Tìm đường',
        headerShown: false,
        tabBarIcon: ({ color }) => {
          return <FontAwesome name="map" size={20} color={color} />
        },
      }} />
      <Tabs.Screen name="find-bus" options={{
        title: 'Tra cứu',
        headerShown: false,
        tabBarIcon: ({ color }) => {
          return <FontAwesome name="search" size={20} color={color} />
        },
      }} />
    </Tabs>
  )
};

export default Layout;
