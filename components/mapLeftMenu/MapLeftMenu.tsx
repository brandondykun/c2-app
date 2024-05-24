import { useRef, useEffect } from "react";
import { StyleSheet, View, ScrollView, Animated } from "react-native";
import { useMapState } from "../../context/mapState/MapStateContext";
import AddPointForm from "../leftMenus/forms/AddPointForm";
import { COLORS } from "../../colors/colors";
import SelectedPointDetails from "../leftMenus/selectedPointDetails/SelectedPointDetails";
import LayersView from "../leftMenus/layersView/LayersView";
import GetCoordinateDetails from "../leftMenus/getCoordinateDetails/GetCoordinateDetails";
import MeasurePointsMenu from "../leftMenus/measurePointsMenu/MeasurePointsMenu";
import MessagesMenu from "../leftMenus/messagesMenu/MessagesMenu";
import TeamMembersList from "../leftMenus/teamMembersList/TeamMembersList";

const MapLeftMenu = () => {
  const { state } = useMapState();

  const slideAnim = useRef(new Animated.Value(-400)).current; // Initial

  let activeComponent = null;

  useEffect(() => {
    if (state.activeMenu) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(-400);
    }
  }, [state.activeMenu]);

  if (state.activeMenu === "ADD_POINT") {
    activeComponent = <AddPointForm />;
  } else if (state.activeMenu === "POINT_DETAILS") {
    activeComponent = <SelectedPointDetails />;
  } else if (state.activeMenu === "VIEW_LAYERS") {
    activeComponent = <LayersView />;
  } else if (state.activeMenu === "GET_COORDINATE_DETAILS") {
    activeComponent = <GetCoordinateDetails />;
  } else if (state.activeMenu === "MEASURE_POINTS") {
    activeComponent = <MeasurePointsMenu />;
  } else if (state.activeMenu === "MESSAGES") {
    activeComponent = <MessagesMenu />;
  } else if (state.activeMenu === "TEAM") {
    activeComponent = <TeamMembersList />;
  }

  if (!state.activeMenu) {
    return null;
  }

  if (state.activeMenu === "MESSAGES") {
    return (
      <View style={s.root}>
        <Animated.View
          style={{
            ...s.animated,
            transform: [
              {
                translateX: slideAnim,
              },
            ],
          }}
        >
          {activeComponent}
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <Animated.View
        style={{
          ...s.animated,
          transform: [
            {
              translateX: slideAnim,
            },
          ],
        }}
      >
        <ScrollView contentContainerStyle={s.scroll}>
          {activeComponent}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default MapLeftMenu;

const s = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "auto",
    overflow: "hidden",
    zIndex: 2,
  },
  animated: {
    height: "100%",
    backgroundColor: COLORS.gray[900],
  },
  scroll: {
    padding: 8,
    paddingRight: 12,
    flexGrow: 1,
  },
});
