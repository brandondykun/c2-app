import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, View } from "react-native";
import { useMapState } from "../../../context/mapState/MapStateContext";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../ui/text/Text";
import { COLORS } from "../../../colors/colors";
import Button from "../../ui/button/Button";
import CoordinateConverter from "../../coordinateConverter/CoordinateConverter";

const GetCoordinateDetails = () => {
  const { state, dispatch } = useMapState();

  const onPress = () => {
    dispatch({ type: "SET_ACTIVE_MENU", payload: "ADD_POINT" });
    dispatch({ type: "SET_ACTIVE_MAP_STATE", payload: "ADD_POINT" });
  };

  const handleClosePress = () => {
    Haptics.selectionAsync();
    dispatch({ type: "CLOSE_GET_COORDINATE_DETAILS_MENU" });
  };

  return (
    <View style={s.root}>
      <Text style={s.label}>Coordinate</Text>
      <CoordinateConverter
        coordinate={state.tempCoordinate}
        style={{ fontSize: 17 }}
      />

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
          <Button label="ADD POINT" onPress={onPress} />
        </View>
      </View>
    </View>
  );
};

export default GetCoordinateDetails;

const s = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 300,
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
