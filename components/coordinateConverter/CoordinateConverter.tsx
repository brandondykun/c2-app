import { StyleProp, TextStyle } from "react-native";
import { Coordinate } from "../../types/types";
import Text from "../ui/text/Text";
import { LLtoMGRS } from "../../utils/utils";
import { truncateLLCoord } from "../../utils/utils";

type Props = {
  coordinate: Coordinate | null;
  style?: StyleProp<TextStyle>;
};

const CoordinateConverter = ({ coordinate, style }: Props) => {
  if (!coordinate) return null;

  if (coordinate.latitude > 84 || coordinate.latitude < -80) {
    return (
      <Text>
        {truncateLLCoord(coordinate.latitude)},{" "}
        {truncateLLCoord(coordinate.longitude)}
      </Text>
    );
  }

  const mgrsGrid = LLtoMGRS({
    longitude: coordinate.longitude,
    latitude: coordinate.latitude,
  });

  return (
    <>
      <Text style={style}>{mgrsGrid}</Text>
    </>
  );
};

export default CoordinateConverter;
