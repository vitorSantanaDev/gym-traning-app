import { StatusBar, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading";

import { THEME } from "./src/theme";
import { Routes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
