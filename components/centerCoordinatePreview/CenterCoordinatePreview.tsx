import { StyleSheet, View } from "react-native";
import Text from "../ui/text/Text";
import { COLORS } from "../../colors/colors";
import { LLtoMGRS } from "../../utils/utils";
import { Coordinate } from "../../types/types";

type Props = {
  coordinate: Coordinate;
};
const CenterCoordinatePreview = ({ coordinate }: Props) => {
  const mgrs = LLtoMGRS(coordinate);

  return (
    <View style={s.root}>
      <Text style={s.text}>{mgrs}</Text>
    </View>
  );
};

export default CenterCoordinatePreview;

const s = StyleSheet.create({
  root: {
    backgroundColor: COLORS.gray[900],
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 15,
  },
});
