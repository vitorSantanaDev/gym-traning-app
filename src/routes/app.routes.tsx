import { Platform } from "react-native";

import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";

import HomeIconSVG from "@assets/home.svg";
import HistoryIconSVG from "@assets/history.svg";
import ProfileIconSVG from "@assets/profile.svg";

import { Home } from "@screens/Home";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";
import { Exercise } from "@screens/Exercise";

type AppRoutesProps = {
  home: undefined;
  exercise: undefined;
  profile: undefined;
  history: undefined;
};

export type AuthNavgigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconsSize = sizes["6"];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green["500"],
        tabBarInactiveTintColor: colors.gray["200"],
        tabBarStyle: {
          backgroundColor: colors.gray["600"],
          borderTopWidth: 0,
          height: Platform.OS === "ios" ? 96 : "auto",
          paddingBottom: sizes["10"],
          paddingTop: sizes["6"],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIconSVG height={iconsSize} width={iconsSize} fill={color} />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistoryIconSVG height={iconsSize} width={iconsSize} fill={color} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileIconSVG height={iconsSize} width={iconsSize} fill={color} />
          ),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
