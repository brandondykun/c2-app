import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, View, Text } from "react-native";
import MapScreen from "./screens/mapScreen/MapScreen";
import ButtonHelpContextProvider from "./context/buttonHelpContext/ButtonHelpContext";
import AuthContextProvider, {
  useAuthContext,
} from "./context/authContext/AuthContext";
import ButtonHelpModal from "./components/buttonHelpModal/ButtonHelpModal";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { COLORS } from "./colors/colors";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import { Team, Profile } from "./types/types";
import ManageTeamsScreen from "./screens/manageTeamsScreen/ManageTeamsScreen";
import TeamDetailsScreen from "./screens/teamDetailsScreen/TeamDetailsScreen";
import ManageMissionsScreen from "./screens/manageMissionsScreen.tsx/ManageMissionsScreen";
import MissionDetailsScreen from "./screens/missionDetailsScreen/MissionDetailsScreen";
import ActiveMissionContextProvider from "./context/activeMissionContext/ActiveMissionContext";
import MapStateContextProvider from "./context/mapState/MapStateContext";
import MapGraphicsContextProvider from "./context/mapGraphics/MapGraphicsContext";
import RegisterScreen from "./screens/registerScreen/RegisterScreen";

export type RootStackParamList = {
  homeScreen: undefined;
  mapScreen: undefined;
  loginScreen: undefined;
  registerScreen: undefined;
  teamDetailsScreen: {
    team?: Team;
    id?: number;
  };
  manageTeamsScreen: undefined;
  manageMissionsScreen: undefined;
  missionDetailsScreen: {
    id: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.gray[950] },
        headerStyle: { backgroundColor: COLORS.gray[950] },
        headerTintColor: COLORS.gray[400],
      }}
    >
      <Stack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="mapScreen"
        component={MapScreen}
        options={{
          orientation: "landscape",
          headerShown: false,
          title: "Map",
        }}
      />
      <Stack.Screen
        name="manageTeamsScreen"
        component={ManageTeamsScreen}
        options={{ title: "Your Teams" }}
      />
      <Stack.Screen
        name="teamDetailsScreen"
        component={TeamDetailsScreen}
        options={{ title: "Team Details" }}
      />
      <Stack.Screen
        name="manageMissionsScreen"
        component={ManageMissionsScreen}
        options={{ title: "Missions" }}
      />
      <Stack.Screen
        name="missionDetailsScreen"
        component={MissionDetailsScreen}
        options={{ title: "Mission Details" }}
      />
    </Stack.Navigator>
  );
};

const NoAuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.gray[950] },
        headerTintColor: COLORS.gray[200],
        contentStyle: {
          backgroundColor: COLORS.gray[950],
        },
      }}
    >
      <Stack.Screen
        name="loginScreen"
        component={LoginScreen}
        options={{ title: "Log In" }}
      />
      <Stack.Screen
        name="registerScreen"
        component={RegisterScreen}
        options={{ title: "Create Account" }}
      />
    </Stack.Navigator>
  );
};

const RenderedStack = () => {
  const { isAuthenticated, authLoading } = useAuthContext();

  if (authLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return isAuthenticated ? <AuthStack /> : <NoAuthStack />;
};

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar style="light" />
        <AuthContextProvider>
          <ActiveMissionContextProvider>
            <MapStateContextProvider>
              <MapGraphicsContextProvider>
                <ButtonHelpContextProvider>
                  <RenderedStack />
                  <ButtonHelpModal />
                </ButtonHelpContextProvider>
              </MapGraphicsContextProvider>
            </MapStateContextProvider>
          </ActiveMissionContextProvider>
        </AuthContextProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
});
