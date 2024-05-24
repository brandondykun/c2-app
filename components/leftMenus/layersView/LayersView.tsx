import { Pressable, StyleSheet, View } from "react-native";
import Text from "../../ui/text/Text";
import { useMapGraphics } from "../../../context/mapGraphics/MapGraphicsContext";
import { useMapState } from "../../../context/mapState/MapStateContext";
import { Point } from "../../../types/types";
import { COLORS } from "../../../colors/colors";
import Collapsible from "../../collapsible/Collapsible";
import CollapsibleLayer from "../../collapsibleLayer/CollapsibleLayer";

const LayersView = () => {
  const { points } = useMapGraphics();
  const { state, dispatch } = useMapState();

  const onPress = (point: Point) => {
    dispatch({ type: "SELECT_POINT", payload: point });
  };

  const enemyPoints = points.filter((point) => {
    return point.type === "ENEMY";
  });

  const friendlyPoints = points.filter((point) => {
    return point.type === "FRIENDLY";
  });

  const neutralPoints = points.filter((point) => {
    return point.type === "NEUTRAL";
  });

  const unknownPoints = points.filter((point) => {
    return point.type === "UNKNOWN";
  });

  const navigationPoints = points.filter((point) => {
    return point.type === "NAVIGATION";
  });

  return (
    <View style={s.root}>
      <Text style={s.header}>MAP LAYERS</Text>
      <View>
        <CollapsibleLayer
          label="ENEMY POINTS"
          points={enemyPoints}
          onPress={onPress}
        />
        <CollapsibleLayer
          label="FRIENDLY POINTS"
          points={friendlyPoints}
          onPress={onPress}
        />
        <CollapsibleLayer
          label="NAVIGATION POINTS"
          points={navigationPoints}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default LayersView;

const s = StyleSheet.create({
  root: {
    flex: 1,
    minWidth: 300,
    backgroundColor: COLORS.gray[900],
    maxWidth: 300,
  },
  header: {
    fontSize: 18,
    textTransform: "uppercase",
    color: COLORS.lime[500],
    fontWeight: "bold",
  },
});
