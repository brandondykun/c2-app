import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "../../components/map/Map";
import { COLORS } from "../../colors/colors";
import TopBar from "../../components/topBar/TopBar";
import Text from "../../components/ui/text/Text";
import { useMapState } from "../../context/mapState/MapStateContext";
import MapLeftMenu from "../../components/mapLeftMenu/MapLeftMenu";

const MapScreen = () => {
  const { state, dispatch } = useMapState();

  return (
    <View style={s.root}>
      <SafeAreaView style={{ width: "100%", height: "100%", zIndex: 3 }}>
        <TopBar />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, position: "relative" }}>
            {state.activeMapStateText ? (
              <>
                <View style={s.colorBackground}></View>
                <View
                  style={[
                    s.textContainer,
                    state.activeMenu && { paddingLeft: 300 },
                  ]}
                >
                  <Text style={{ color: COLORS.gray[900], zIndex: 2 }}>
                    {state.activeMapStateText}
                  </Text>
                </View>
              </>
            ) : null}
            <Map />
            <MapLeftMenu />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MapScreen;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.gray[950],
  },
  map: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 28,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  colorBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 28,
    backgroundColor: COLORS.lime[600],
    opacity: 0.8,
    zIndex: 1,
  },
});
