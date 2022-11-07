import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { PlusCircle, SoccerBall } from "phosphor-react-native"

import { NewPoll } from "../screens/NewPoll"
import { Polls } from "../screens/Polls"
import { FindPoll } from "../screens/FindPoll"

import { THEME } from "../styles/theme"

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
    const { colors, sizes } = THEME

    const iconSize = sizes[6]

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelPosition: "beside-icon",
                tabBarActiveTintColor: colors.yellow[500],
                tabBarInactiveTintColor: colors.gray[300],
                tabBarStyle: {
                    position: "absolute",
                    height: sizes[22],
                    borderTopWidth: 0,
                    backgroundColor: colors.gray[800],
                },
                tabBarItemStyle: {
                    position: "relative",
                    top: Platform.OS === "android" ? -10 : 0,
                },
            }}
        >
            <Screen
                name="new"
                component={NewPoll}
                options={{
                    tabBarIcon: ({ color }) => (
                        <PlusCircle color={color} size={iconSize} />
                    ),
                    tabBarLabel: "Novo Bolão",
                }}
            />

            <Screen
                name="polls"
                component={Polls}
                options={{
                    tabBarIcon: ({ color }) => (
                        <SoccerBall color={color} size={iconSize} />
                    ),
                    tabBarLabel: "Meus Bolões",
                }}
            />

            <Screen
                name="findPolls"
                component={FindPoll}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </Navigator>
    )
}
