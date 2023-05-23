import { Tabs } from "expo-router"
import { COLORS, icons } from "../../constants"
import { ScreenHeaderBtn } from "../../components"
import { FontAwesome } from '@expo/vector-icons';

export default () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: COLORS.tertiary,
            tabBarInactiveTintColor: COLORS.gray,
        }} >
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
}