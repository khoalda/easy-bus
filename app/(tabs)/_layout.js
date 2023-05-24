import { Tabs } from "expo-router"
import { COLORS, icons } from "../../constants"
import { ScreenHeaderBtn } from "../../components"
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";

export default () => {
    const router = useRouter()

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: COLORS.tertiary,
            tabBarInactiveTintColor: COLORS.gray,
            headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.logo} dimension='180%' handlePress={() => {
                    router.push('home')
                }} margin={true} />
            ),
            headerShadowVisible: false,
        }} >
            <Tabs.Screen name="home" options={{
                title: 'Tổng quan',
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerTitle: "Easy Bus",
                tabBarIcon: ({ color }) => {
                    return <FontAwesome name="home" size={20} color={color} />
                },
            }} />
            <Tabs.Screen name="find-route" options={{
                title: 'Tìm đường',
                headerStyle: { backgroundColor: COLORS.lightWhite },
                tabBarIcon: ({ color }) => {
                    return <FontAwesome name="map" size={20} color={color} />
                },
            }} />
            <Tabs.Screen name="find-bus" options={{
                title: 'Tra cứu',
                headerStyle: { backgroundColor: COLORS.lightWhite },
                tabBarIcon: ({ color }) => {
                    return <FontAwesome name="search" size={20} color={color} />
                },
            }} />
        </Tabs>
    )
}