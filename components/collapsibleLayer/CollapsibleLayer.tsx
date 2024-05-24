import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View, Pressable } from "react-native";
import Text from "../ui/text/Text";
import { COLORS } from "../../colors/colors";
import { Point } from "../../types/types";
import { useMapState } from "../../context/mapState/MapStateContext";
import Collapsible from "../collapsible/Collapsible";
import { useMapGraphics } from "../../context/mapGraphics/MapGraphicsContext";

type Props = {
  points: Point[];
  label: string;
  onPress: (point: Point) => void;
};
const CollapsibleLayer = ({ points, label, onPress }: Props) => {
  const { state, dispatch, mapRef } = useMapState();
  const { hidePoint, showPoint } = useMapGraphics();

  if (!points || points.length === 0) {
    return null;
  }

  const onGoToPress = (point: Point) => {
    if (point.visible) {
      mapRef.current?.animateToRegion({
        latitude: point.lat,
        longitude: point.lng > 0 ? point.lng + 0.006 : point.lng - 0.006,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleHidePress = (id: number) => {
    hidePoint(id);
    if (id === state.selectedPoint?.id) {
      dispatch({ type: "UNSELECT_POINT" });
    }
  };

  const handleShowPress = (id: number) => {
    showPoint(id);
  };

  const handlePress = (point: Point) => {
    if (point.visible) {
      onPress(point);
    }
  };

  return (
    <Collapsible title={label} initExpanded={true}>
      {points.map((point) => {
        return (
          <Pressable onPress={() => handlePress(point)} key={point.id}>
            <View
              style={{
                backgroundColor:
                  state.selectedPoint?.id === point.id
                    ? COLORS.gray[700]
                    : COLORS.gray[800],
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight:
                    state.selectedPoint?.id === point.id ? "bold" : "normal",
                  color:
                    state.selectedPoint?.id === point.id
                      ? COLORS.lime[400]
                      : COLORS.gray[300],
                  opacity: point.visible ? 1 : 0.5,
                }}
              >
                {point.label}
              </Text>
              <View
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
              >
                {point.visible ? (
                  <Pressable
                    onPress={() => handleHidePress(point.id)}
                    style={({ pressed }) => [
                      {
                        paddingVertical: 2,
                        paddingHorizontal: 4,
                        opacity: pressed ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Ionicons name="eye" size={16} color={COLORS.gray[400]} />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => handleShowPress(point.id)}
                    style={({ pressed }) => [
                      {
                        paddingVertical: 2,
                        paddingHorizontal: 4,
                        opacity: pressed ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Ionicons
                      name="eye-off"
                      size={16}
                      color={COLORS.gray[400]}
                    />
                  </Pressable>
                )}
                <Pressable
                  onPress={() => onGoToPress(point)}
                  style={({ pressed }) => [
                    {
                      paddingVertical: 2,
                      paddingHorizontal: 4,
                      opacity: pressed && point.visible ? 0.5 : 1,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="crosshairs-gps"
                    size={16}
                    color={COLORS.gray[400]}
                    style={{ opacity: point.visible ? 1 : 0.5 }}
                  />
                </Pressable>
              </View>
            </View>
          </Pressable>
        );
      })}
    </Collapsible>
  );
};

export default CollapsibleLayer;
