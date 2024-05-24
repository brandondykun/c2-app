import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../App";
import { COLORS } from "../../colors/colors";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { Team } from "../../types/types";
import { searchTeams } from "../../api/teams";
import { addMemberToTeam, removeMemberFromTeam } from "../../api/teams";
import useTeam from "../../hooks/useTeam/useTeam";
import useMission from "../../hooks/useMission/useMission";
import Button from "../../components/ui/button/Button";
import IconButton from "../../components/ui/iconButton/IconButton";
import FullScreenModal from "../../components/ui/fullScreenModal/FullScreenModal";
import Input from "../../components/ui/input/Input";
import Loading from "../../components/ui/loading/Loading";
import { addTeamToMission, removeTeamFromMission } from "../../api/missions";

const MissionDetailsScreen = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, "missionDetailsScreen">>();

  const [addTeamModalVisible, setAddTeamModalVisible] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamNameError, setTeamNameError] = useState("");

  const [searchResults, setSearchResults] = useState<Team[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchComplete, setSearchComplete] = useState(false);

  const id = route.params.id;

  const { profile: authProfile } = useAuthContext();
  const { data, error, loading, refetch, addTeam, removeTeam } = useMission(id);

  const toggleAddTeamModal = () => {
    setAddTeamModalVisible((prev) => !prev);
  };

  const handleSearch = async () => {
    let hasErrors = false;
    setTeamNameError("");

    if (!teamName) {
      setTeamNameError("Please enter a team name.");
      hasErrors = true;
    }

    if (hasErrors) return;
    setSearchLoading(true);
    const { data, error } = await searchTeams(teamName);
    if (data && !error) {
      setSearchResults(data);
    } else {
      setSearchError("There was an error with that search. Please Try again.");
    }
    setSearchComplete(true);
    setSearchLoading(false);
  };

  const handleAddTeamPress = async (team: Team) => {
    if (data) {
      const { error, data: addTeamData } = await addTeamToMission(
        data.id,
        team.id!
      );
      if (addTeamData && !error) {
        addTeam(team);
      }
    }
  };

  const handleRemovePress = async (teamId: number) => {
    if (data) {
      const { data: removeTeamData, error } = await removeTeamFromMission(
        data.id,
        teamId
      );
      if (!error) {
        removeTeam(teamId);
      }
    }
  };

  const missionTeamIds = data?.teams.map((team) => team.id);

  if (loading) {
    return <Loading text="Loading Mission..." />;
  }

  if (!loading && error) {
    return (
      <View>
        <Text
          style={{
            color: COLORS.red[600],
            textAlign: "center",
            marginVertical: 48,
            fontSize: 20,
          }}
        >
          There was an error fetching that team. Please try again.
        </Text>
        <Button label="Try Again" onPress={refetch} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.root}>
      <View>
        <View
          style={{
            backgroundColor: COLORS.gray[800],
            padding: 18,
            marginBottom: 24,
            borderRadius: 8,
            gap: 24,
          }}
        >
          <View>
            <Text
              style={{
                color: COLORS.gray[200],
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              {data?.name}
            </Text>
          </View>
          <View>
            <Text style={{ color: COLORS.gray[500], fontSize: 18 }}>
              Description
            </Text>
            <Text style={{ color: COLORS.gray[300], fontSize: 18 }}>
              {data?.about}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ color: COLORS.gray[200], fontSize: 24 }}>Teams</Text>
            <IconButton onPress={toggleAddTeamModal}>
              <Feather name="plus" size={22} color={COLORS.gray[950]} />
            </IconButton>
          </View>
          <View style={{ gap: 10 }}>
            {data?.teams &&
              data.teams.map((team) => {
                return (
                  <View key={team.id} style={s.profileCard}>
                    <Text style={{ color: COLORS.gray[200], fontSize: 18 }}>
                      {team.name}
                    </Text>
                    {/* {profile.id !== authProfile.id && ( */}
                    <IconButton
                      onPress={() => handleRemovePress(team.id)}
                      style={{ backgroundColor: COLORS.red[600] }}
                    >
                      <Ionicons
                        name="person-remove-sharp"
                        size={16}
                        color="black"
                      />
                    </IconButton>
                    {/* )} */}
                  </View>
                );
              })}
          </View>
        </View>
      </View>
      <FullScreenModal
        title="Add Team to Mission"
        withCloseButton
        visible={addTeamModalVisible}
        onRequestClose={toggleAddTeamModal}
      >
        <Input
          value={teamName}
          onChangeText={setTeamName}
          label="Search By Team name"
          error={teamNameError}
        />
        <View style={{ flex: 1, gap: 12 }}>
          {searchComplete && searchResults.length && !searchError ? (
            searchResults
              .filter((team) => {
                return !missionTeamIds?.includes(team.id!);
              })
              .map((team) => {
                return (
                  <View
                    key={team.id}
                    style={{
                      backgroundColor: COLORS.gray[800],
                      padding: 12,
                      borderRadius: 6,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: COLORS.gray[200], fontSize: 16 }}>
                      {team.name}
                    </Text>
                    <IconButton onPress={() => handleAddTeamPress(team)}>
                      <Feather name="plus" size={14} color={COLORS.gray[950]} />
                    </IconButton>
                  </View>
                );
              })
          ) : searchComplete && searchError ? (
            <View>
              <Text
                style={{
                  color: COLORS.red[600],
                  textAlign: "center",
                  fontSize: 16,
                  paddingTop: 24,
                }}
              >
                There was an error with that search
              </Text>
            </View>
          ) : searchComplete ? (
            <Text
              style={{
                color: COLORS.gray[400],
                textAlign: "center",
                fontSize: 16,
                paddingTop: 24,
              }}
            >
              No results found.
            </Text>
          ) : (
            <Text
              style={{
                color: COLORS.gray[500],
                textAlign: "center",
                fontSize: 16,
                paddingTop: 24,
              }}
            >
              Search for a Team by name.
            </Text>
          )}
        </View>

        <Button
          label="Search"
          onPress={handleSearch}
          disabled={searchLoading}
        />
      </FullScreenModal>
    </ScrollView>
  );
};

export default MissionDetailsScreen;

const s = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 12,
    paddingBottom: 24,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    color: COLORS.gray[300],
  },
  profileCard: {
    backgroundColor: COLORS.gray[900],
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
