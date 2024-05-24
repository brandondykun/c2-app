import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, View } from "react-native";
import { useMapState } from "../../../context/mapState/MapStateContext";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../ui/text/Text";
import { COLORS } from "../../../colors/colors";
import Button from "../../ui/button/Button";
import CoordinateConverter from "../../coordinateConverter/CoordinateConverter";
import { point, bearingToAzimuth } from "@turf/helpers";
import distance from "@turf/distance";
import bearing from "@turf/bearing";
import { degreesToMils } from "../../../utils/utils";

const MeasurePointsMenu = () => {
  const { state, dispatch } = useMapState();

  const handleClosePress = () => {
    Haptics.selectionAsync();
    dispatch({ type: "CANCEL_POINTS_MEASURE" });
  };

  if (!state.measurePointOne || !state.measurePointTwo) {
    return null;
  }

  const from = point([
    state.measurePointOne?.longitude!,
    state.measurePointOne?.latitude!,
  ]);
  const to = point([
    state.measurePointTwo?.longitude!,
    state.measurePointTwo?.latitude!,
  ]);
  const distanceMeasure = distance(from, to, { units: "meters" });

  const bearingMeasure = bearing(from, to);
  const azimuth = bearingToAzimuth(bearingMeasure);

  return (
    <View style={s.root}>
      <Text style={s.labelText}>Point One</Text>
      <Text style={s.coords}>
        <CoordinateConverter coordinate={state.measurePointOne} />
      </Text>
      <Text style={s.labelText}>Point Two</Text>
      <Text style={s.coords}>
        <CoordinateConverter coordinate={state.measurePointTwo} />
      </Text>
      <Text style={s.labelText}>Distance</Text>
      <Text style={s.coords}>{Math.trunc(distanceMeasure)}m</Text>
      <Text style={s.labelText}>Direction</Text>
      <Text style={s.coords}>{Math.trunc(azimuth)}°</Text>
      <Text style={s.coords}>{degreesToMils(azimuth)} mils</Text>

      <View style={s.buttonsContainer}>
        <View style={s.buttons}>
          <Pressable
            onPress={handleClosePress}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1, padding: 6 },
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.gray[500]} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MeasurePointsMenu;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: 300,
  },
  labelText: {
    color: COLORS.gray[500],
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: COLORS.lime[500],
  },
  coords: {
    fontSize: 18,
    marginBottom: 24,
  },
  description: {
    fontSize: 18,
    marginBottom: 24,
  },
  pointType: {
    fontSize: 18,
    marginBottom: 24,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
