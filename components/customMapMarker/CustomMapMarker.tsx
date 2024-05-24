import { MapMarkerProps, Marker } from "react-native-maps";
import { Point, PointType } from "../../types/types";
import { View } from "react-native";
import { COLORS } from "../../colors/colors";
import { useMapState } from "../../context/mapState/MapStateContext";

type Props = {
  point: Point;
  isSelected: boolean;
} & Omit<MapMarkerProps, "coordinate">;

const CustomMapMarker = ({ point, isSelected, ...rest }: Props) => {
  const { state } = useMapState();

  let pointColor = COLORS.lime[700];
  let borderColor = COLORS.lime[200];

  if (point.type === "ENEMY") {
    pointColor = COLORS.red[600];
    borderColor = COLORS.red[200];
  } else if (point.type === "FRIENDLY") {
    pointColor = COLORS.sky[600];
    borderColor = COLORS.sky[200];
  }

  // if this point is selected and there is a tempCoordinate,
  // this point location is being edited so make invisible
  const opacity = state.tempCoordinate && isSelected ? 0 : 1;

  return (
    <Marker
      key={point.id}
      stopPropagation={true}
      {...rest}
      coordinate={{ latitude: point.lat, longitude: point.lng }}
    >
      <View
        style={{
          height: isSelected ? 18 : 12,
          width: isSelected ? 18 : 12,
          borderRadius: 20,
          backgroundColor: pointColor,
          borderWidth: isSelected ? 3 : 1,
          borderColor: isSelected ? COLORS.yellow[300] : borderColor,
          opacity: opacity,
        }}
      ></View>
    </Marker>
  );
};

export default CustomMapMarker;
