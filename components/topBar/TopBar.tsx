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
import { useTeamChatContext } from "../../context/teamChatContext/TeamChatContext";
import { MaterialIcons } from "@expo/vector-icons";
import ShowCurrentGridButton from "../buttons/showCurrentGridButton/ShowCurrentGridButton";

const TopBar = () => {
  const { activeMission, activeTeam } = useActiveMission();

  const { teamChatConnected } = useTeamChatContext();

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
      <MessageButton />
      <TeamButton />
      <ShowCurrentGridButton />
      <ShowCenterGridButton />
      <HelpButton />
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View style={s.topBarInfoContainer}>
          {/* <View>
            <Text>{activeMission?.name ? activeMission.name : "NONE"}</Text>
            <Text>{activeTeam?.name ? activeTeam.name : "NONE"}</Text>
          </View> */}
          <Time />
          <View style={{ paddingHorizontal: 4, justifyContent: "center" }}>
            <MaterialIcons
              name="connect-without-contact"
              size={24}
              color={teamChatConnected ? COLORS.lime[500] : COLORS.red[600]}
            />
          </View>
        </View>
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
  topBarInfoContainer: {
    backgroundColor: COLORS.gray[900],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    flexDirection: "row",
    gap: 8,
  },
});
