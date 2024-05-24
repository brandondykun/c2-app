import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Button from "../../components/ui/button/Button";
import useTypeSafeNavigation from "../../hooks/useTypeSafeNavigation/useTypeSafeNavigation";
import { COLORS } from "../../colors/colors";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Text from "../../components/ui/text/Text";
import DropdownSelect from "../../components/ui/dropdownSelect/DropdownSelect";
import { useEffect, useState } from "react";
import { useActiveMission } from "../../context/activeMissionContext/ActiveMissionContext";
import useMissions from "../../hooks/useMissions/useMissions";
import useTeams from "../../hooks/useTeams/useTeams";
import { Option } from "../../components/ui/dropdownSelect/DropdownSelect";
import { useAuthContext } from "../../context/authContext/AuthContext";

const HomeScreen = () => {
  const navigation = useTypeSafeNavigation();

  const { profile } = useAuthContext();

  const { activeMission, activeTeam, setActiveTeam, activateMission } =
    useActiveMission();

  const { error: missionsError, data: missionsData } = useMissions();
  const { error: teamsError, data: teamsData } = useTeams();

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);

  const handleGoToMapPress = () => {
    navigation.navigate("mapScreen");
  };

  const handleYourTeamsPress = () => {
    navigation.navigate("manageTeamsScreen");
  };

  const handleYourMissionsPress = () => {
    navigation.navigate("manageMissionsScreen");
  };

  const missionOptions = missionsData
    ? missionsData.map((mission) => {
        return { key: mission.id, value: mission.name, disabled: false };
      })
    : null;

  const selectedMissionToDisplay = activeMission
    ? { key: activeMission.id, value: activeMission.name, disabled: false }
    : missionOptions
    ? missionOptions[0]
    : null;

  const handleSelectMission = (missionKey: number | string) => {
    if (missionsData) {
      const selected = missionsData.find((mission) => {
        return mission.id === missionKey;
      });
      activateMission(selected!);

      // filter the team from the missions teams that the user belongs to
      const teamToSelect = selected?.teams.filter((team) => {
        return team.members.includes(profile.id!);
      });

      setActiveTeam(teamToSelect ? teamToSelect[0] : null);
    }
  };

  return (
    <ScrollView contentContainerStyle={s.root}>
      <Text style={s.header}>Quick NAV</Text>
      <View>
        <Text>Active Mission</Text>
        {/* <DropdownSelect label="Team" selected={selectedMissionOption} /> */}
        {selectedMissionToDisplay && missionOptions && (
          <DropdownSelect
            label="Mission"
            selected={selectedMissionToDisplay}
            data={missionOptions}
            setSelected={handleSelectMission}
            defaultOption={missionOptions[0]}
          />
        )}
      </View>
      <View style={s.linksContainer}>
        <Pressable
          onPress={handleGoToMapPress}
          style={({ pressed }) => pressed && s.pressed}
        >
          <View style={s.linkCard}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome name="map-o" size={24} color={COLORS.gray[500]} />
              <Text
                style={{
                  color: COLORS.gray[300],
                  fontSize: 20,
                  marginLeft: 24,
                }}
              >
                Go To Map
              </Text>
            </View>

            <Entypo name="chevron-right" size={24} color={COLORS.gray[500]} />
          </View>
        </Pressable>
        <Pressable
          onPress={handleYourTeamsPress}
          style={({ pressed }) => pressed && s.pressed}
        >
          <View style={s.linkCard}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome name="th-list" size={24} color={COLORS.gray[600]} />
              <Text
                style={{
                  color: COLORS.gray[300],
                  fontSize: 20,
                  marginLeft: 24,
                }}
              >
                Manage Your Teams
              </Text>
            </View>
            <Entypo name="chevron-right" size={24} color={COLORS.gray[500]} />
          </View>
        </Pressable>
        <Pressable
          onPress={handleYourMissionsPress}
          style={({ pressed }) => pressed && s.pressed}
        >
          <View style={s.linkCard}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome name="th-list" size={24} color={COLORS.gray[600]} />
              <Text
                style={{
                  color: COLORS.gray[300],
                  fontSize: 20,
                  marginLeft: 24,
                }}
              >
                Manage Missions
              </Text>
            </View>
            <Entypo name="chevron-right" size={24} color={COLORS.gray[500]} />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const s = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 12,
    paddingBottom: 24,
  },
  header: {
    color: COLORS.gray[300],
    textAlign: "center",
    fontSize: 20,
    marginBottom: 24,
  },
  linksContainer: {
    gap: 12,
  },
  linkCard: {
    backgroundColor: COLORS.gray[900],
    padding: 24,
    borderColor: COLORS.gray[700],
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.6,
  },
});
