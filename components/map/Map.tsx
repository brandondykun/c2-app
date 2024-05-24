import * as Haptics from "expo-haptics";
import MapView, { MapPressEvent, Marker, Polyline } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useMapState } from "../../context/mapState/MapStateContext";
import { useMapGraphics } from "../../context/mapGraphics/MapGraphicsContext";
import { COLORS } from "../../colors/colors";
import { Coordinate, Point } from "../../types/types";
import CustomMapMarker from "../customMapMarker/CustomMapMarker";
import { getInitialRegion } from "../../utils/utils";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import Text from "../ui/text/Text";
import CenterCoordinatePreview from "../centerCoordinatePreview/CenterCoordinatePreview";
import useLocation from "../../hooks/useLocation/useLocation";

const TempCoordinate = () => {
  const { state, dispatch } = useMapState();

  if (state.tempCoordinate) {
    return (
      <Marker
        coordinate={state.tempCoordinate}
        draggable
        onDragStart={() => {
          Haptics.selectionAsync();
        }}
        onDrag={(e) => {
          dispatch({
            type: "SET_TEMP_COORDINATE",
            payload: e.nativeEvent.coordinate,
          });
        }}
      >
        <Entypo name="cross" size={24} color={COLORS.yellow[400]} />
      </Marker>
    );
  }

  return null;
};

const MeasurePointOne = () => {
  const { state, dispatch } = useMapState();

  if (state.measurePointOne) {
    return (
      <Marker
        coordinate={state.measurePointOne}
        // draggable
        // onDragStart={() => {
        //   Haptics.selectionAsync();
        // }}
        // onDrag={(e) => {
        //   dispatch({
        //     type: "SET_MEASURE_POINT_ONE",
        //     payload: e.nativeEvent.coordinate,
        //   });
        // }}
      >
        <AntDesign name="plus" size={24} color={COLORS.red[500]} />
      </Marker>
    );
  }

  return null;
};

const MeasurePointTwo = () => {
  const { state, dispatch } = useMapState();

  if (state.measurePointTwo) {
    return (
      <Marker
        coordinate={state.measurePointTwo}
        // draggable
        // onDragStart={() => {
        //   Haptics.selectionAsync();
        // }}
        // onDrag={(e) => {
        //   dispatch({
        //     type: "SET_MEASURE_POINT_TWO",
        //     payload: e.nativeEvent.coordinate,
        //   });
        // }}
      >
        <AntDesign name="plus" size={24} color={COLORS.red[500]} />
      </Marker>
    );
  }

  return null;
};

const MeasureLine = () => {
  const { state } = useMapState();

  if (state.measurePointOne && state.measurePointTwo) {
    return (
      <Polyline
        coordinates={[state.measurePointOne, state.measurePointTwo]}
        strokeColor={COLORS.gray[50]}
        lineDashPattern={[5, 4]}
      />
    );
  }

  return null;
};

const UsersLocation = () => {
  const { location } = useLocation();

  if (location) {
    return (
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        style={{
          transform: [{ rotate: `${location.coords.heading}deg` }],
          position: "relative",
          height: 34,
          width: 34,
        }}
      >
        <MaterialIcons
          name="navigation"
          size={26}
          color={COLORS.lime[400]}
          style={{
            zIndex: 10,
            position: "absolute",
            top: 4,
            right: 4,
          }}
        />
        <MaterialIcons
          name="navigation"
          size={34}
          color={COLORS.lime[50]}
          style={{
            zIndex: 8,
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
      </Marker>
    );
  }
};

const Map = () => {
  const { state, dispatch, mapRef } = useMapState();

  const onMapPress = (e: MapPressEvent) => {
    if (!state.activeMapState) {
      dispatch({ type: "UNSELECT_POINT" });
      dispatch({ type: "SET_ACTIVE_MENU", payload: null });
    } else if (state.activeMapState === "ADD_POINT") {
      Haptics.selectionAsync();
      dispatch({
        type: "ADD_POINT_MAP_PRESS",
        payload: e.nativeEvent.coordinate,
      });
    } else if (state.activeMapState === "EDIT_POINT") {
      Haptics.selectionAsync();
      dispatch({
        type: "EDIT_POINT_MAP_PRESS",
        payload: e.nativeEvent.coordinate,
      });
    } else if (state.activeMapState === "VIEW_LAYERS") {
      dispatch({ type: "UNSELECT_POINT" });
    } else if (state.activeMapState === "GET_COORDINATE") {
      dispatch({
        type: "GET_COORDINATE_MAP_PRESS",
        payload: e.nativeEvent.coordinate,
      });
    } else if (state.activeMapState === "MEASURE_POINTS") {
      if (!state.measurePointOne) {
        dispatch({
          type: "SET_MEASURE_POINT_ONE",
          payload: e.nativeEvent.coordinate,
        });
      } else {
        dispatch({
          type: "SET_MEASURE_POINT_TWO",
          payload: e.nativeEvent.coordinate,
        });
      }
    }
  };

  const onPointPress = (point: Point) => {
    if (state.activeMapState === "EDIT_POINT") return;
    if (state.activeMapState === "MEASURE_POINTS") {
      if (!state.measurePointOne) {
        dispatch({
          type: "SET_MEASURE_POINT_ONE",
          payload: { latitude: point.lat, longitude: point.lng },
        });
      } else {
        dispatch({
          type: "SET_MEASURE_POINT_TWO",
          payload: { latitude: point.lat, longitude: point.lng },
        });
      }
    } else if (state.activeMenu !== "POINT_DETAILS") {
      dispatch({ type: "SET_ACTIVE_MENU", payload: "POINT_DETAILS" });
      dispatch({ type: "SELECT_POINT", payload: point });
    }
    Haptics.selectionAsync();
  };

  const { points } = useMapGraphics();
  const initialRegion = getInitialRegion(points);

  // const [centerCoord, setCenterCoord] = useState(
  //   `${initialRegion ? initialRegion?.latitude : 0}, ${
  //     initialRegion ? initialRegion?.longitude : 0
  //   }`
  // );

  const [centerCoord, setCenterCoord] = useState<Coordinate>({
    latitude: initialRegion ? initialRegion?.latitude : 0,
    longitude: initialRegion ? initialRegion?.longitude : 0,
  });

  return (
    <View style={s.root}>
      <MapView
        style={s.map}
        // showsUserLocation
        mapType="satellite"
        onPress={(e) => onMapPress(e)}
        initialRegion={initialRegion}
        ref={mapRef}
        onRegionChange={(region) => {
          setCenterCoord({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
      >
        <TempCoordinate />
        <MeasurePointOne />
        <MeasurePointTwo />
        <MeasureLine />
        {points &&
          points
            .filter((point) => point.visible)
            .map((point) => {
              return (
                <CustomMapMarker
                  point={point}
                  isSelected={state.selectedPoint?.id === point.id}
                  onSelect={() => onPointPress(point)}
                  key={point.id}
                />
              );
            })}
        <UsersLocation />
      </MapView>
      {state.showCenterGrid && (
        <>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              top: "50%",
              height: 30,
              marginTop: -15,
            }}
          >
            <AntDesign name="plus" size={30} color={COLORS.red[500]} />
          </View>
          <View style={s.coordContainer}>
            <CenterCoordinatePreview coordinate={centerCoord} />
          </View>
        </>
      )}
    </View>
  );
};

export default Map;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  coordContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 2,
    width: 165,
  },
});
