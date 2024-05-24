import { View, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from "react";

import { COLORS } from "../../colors/colors";
import LayersButton from "../buttons/layersButton/LayersButton";
import HelpButton from "../buttons/helpButton/HelpButton";
import BackButton from "../buttons/backButton/BackButton";
import AddPointButton from "../buttons/addPointButton/AddPointButton";
import { useActiveMission } from "../../context/activeMissionContext/ActiveMissionContext";
import Text from "../ui/text/Text";
import Time from "../time/Time";
import GetCoordinateButton from "../buttons/getCoordinateButton/GetCoordinateButton";
import MeasurePointsButton from "../buttons/measurePointsButton/MeasurePointsButton";
import ShowCenterGridButton from "../buttons/showCenterGridButton/ShowCenterGridButton";
import MessageButton from "../buttons/messageButton/MessageButton";
import TeamButton from "../buttons/teamButton/TeamButton";
import useLocation from "../../hooks/useLocation/useLocation";
import { LLtoMGRS } from "../../utils/utils";

const TopBar = () => {
  const { activeMission, activeTeam } = useActiveMission();

  const { location } = useLocation();

  const [orientation, setOrientation] = useState<"LANDSCAPE" | "PORTRAIT">(
    "LANDSCAPE"
  );

  const determineAndSetOrientation = () => {
    let width = Dimensions.get("window").width;
    let height = Dimensions.get("window").height;

    if (width < height) {
      setOrientation("PORTRAIT");
    } else {
      setOrientation("LANDSCAPE");
    }
  };

  useEffect(() => {
    determineAndSetOrientation();
    Dimensions.addEventListener("change", determineAndSetOrientation);
  }, []);

  return (
    <View style={[s.root]}>
      <BackButton />
      <LayersButton />
      <AddPointButton />
      <GetCoordinateButton />
      <MeasurePointsButton />
      <ShowCenterGridButton />
      <MessageButton />
      <TeamButton />
      <HelpButton />
      <View>
        {location && (
          <View>
            <Text>
              ACC:{" "}
              {location.coords.altitudeAccuracy
                ? `+/- ${Math.trunc(location.coords.altitudeAccuracy)} m`
                : "None"}
            </Text>
            <Text>
              ALT:{" "}
              {location.coords.altitude
                ? `${Math.trunc(location.coords.altitude)} m`
                : "N/A"}
            </Text>
            <Text>
              Heading:{" "}
              {location.coords.heading
                ? `${Math.trunc(location.coords.heading)}°`
                : "None"}
            </Text>
            <Text>
              {LLtoMGRS({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              })}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
      >
        <View style={s.missionDetails}>
          <Text>
            Mission: {activeMission?.name ? activeMission.name : "NONE"}
          </Text>
          <Text>Team: {activeTeam?.name ? activeTeam.name : "NONE"}</Text>
        </View>
        <Time />
      </View>
    </View>
  );
};

export default TopBar;

const s = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 4,
    paddingVertical: 2,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[700],
  },
  missionDetails: {
    backgroundColor: COLORS.gray[900],
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
