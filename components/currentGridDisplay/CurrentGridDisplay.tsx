import { StyleSheet, View } from "react-native";

import Text from "../ui/text/Text";
import { LLtoMGRS } from "../../utils/utils";
import useLocation from "../../hooks/useLocation/useLocation";
import { COLORS } from "../../colors/colors";

const CurrentGridDisplay = () => {
  const { location } = useLocation();

  return (
    <View style={s.root}>
      {/* <Text>
              ACC:{" "}
              {location.coords.altitudeAccuracy
                ? `+/- ${Math.trunc(location.coords.altitudeAccuracy)} m`
                : "None"}
            </Text> */}

      {/* <Text>
              Heading:{" "}
              {location.coords.heading
                ? `${Math.trunc(location.coords.heading)}°`
                : "None"}
            </Text> */}
      {location ? (
        <>
          <Text>
            {LLtoMGRS({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            })}
          </Text>
          <Text>
            ALT:{" "}
            {location.coords.altitude
              ? `${Math.trunc(location.coords.altitude)} m`
              : "N/A"}
          </Text>
        </>
      ) : (
        <Text>No Location to display</Text>
      )}
    </View>
  );
};

export default CurrentGridDisplay;

const s = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.gray[900],
    padding: 4,
  },
});
