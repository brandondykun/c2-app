import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, View } from "react-native";
import { useMapState } from "../../../context/mapState/MapStateContext";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../ui/text/Text";
import { COLORS } from "../../../colors/colors";
import Button from "../../ui/button/Button";
import CoordinateConverter from "../../coordinateConverter/CoordinateConverter";
import Coordinate from "../../coordinate/Coordinate";

const SelectedPointDetails = () => {
  const { state, dispatch } = useMapState();

  const onPress = () => {
    dispatch({ type: "POINT_DETAILS_EDIT_PRESS" });
  };

  const handleClosePress = () => {
    Haptics.selectionAsync();
    dispatch({ type: "CLOSE_POINT_DETAILS_MENU" });
  };

  return (
    <View style={s.root}>
      <Text style={s.label}>{state.selectedPoint?.label}</Text>
      <Text style={s.labelText}>Coordinates</Text>
      <Text style={s.coords}>
        {/* <CoordinateConverter
          coordinate={{
            latitude: state.selectedPoint?.lat!,
            longitude: state.selectedPoint?.lng!,
          }}
        /> */}
        <Coordinate point={state.selectedPoint} />
      </Text>
      {/* <Text style={s.coords}>{`${state.selectedPoint?.lat.toFixed(
        6
      )}, ${state.selectedPoint?.lng.toFixed(6)}`}</Text> */}
      <Text style={s.labelText}>Description</Text>
      <Text style={s.description}>{state.selectedPoint?.description}</Text>
      <Text style={s.labelText}>Point Type</Text>
      <Text style={s.pointType}>{state.selectedPoint?.type}</Text>
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
          <Button label="EDIT" onPress={onPress} />
        </View>
      </View>
    </View>
  );
};

export default SelectedPointDetails;

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
