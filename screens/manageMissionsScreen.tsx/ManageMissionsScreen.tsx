import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { COLORS } from "../../colors/colors";
import { createMission } from "../../api/missions";
import { Mission, Team } from "../../types/types";
import useMissions from "../../hooks/useMissions/useMissions";
import useTypeSafeNavigation from "../../hooks/useTypeSafeNavigation/useTypeSafeNavigation";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";
import FullScreenModal from "../../components/ui/fullScreenModal/FullScreenModal";
import IconButton from "../../components/ui/iconButton/IconButton";
import Loading from "../../components/ui/loading/Loading";
import useTeams from "../../hooks/useTeams/useTeams";
import DropdownSelect, {
  Option,
} from "../../components/ui/dropdownSelect/DropdownSelect";

const ManageMissionsScreen = () => {
  const { error, data, loading, refetch } = useMissions();
  const {
    error: teamsError,
    data: teamsData,
    loading: teamsLoading,
  } = useTeams();

  const [addMissionModalOpen, setAddMissionModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [about, setAbout] = useState("");
  const [aboutError, setAboutError] = useState("");

  const defaultSelected = teamsData?.length
    ? { key: teamsData[0].id, value: teamsData[0].name, disabled: false }
    : null;
  const [selectedTeam, setSelectedTeam] = useState<Option>(defaultSelected!);
  const [selectedTeamError, setSelectedTeamError] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigation = useTypeSafeNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (data && isFocused) {
      refetch();
    }
  }, [isFocused]);

  const toggleModal = () => {
    setAddMissionModalOpen((prev) => !prev);
    setName("");
    setAbout("");
    setNameError("");
    setAboutError("");
  };
  const handleAddTeamPress = () => {
    toggleModal();
  };

  const handleMissionPress = (mission: Mission) => {
    navigation.navigate("missionDetailsScreen", {
      id: mission.id,
    });
  };

  const handleAddPress = async () => {
    setNameError("");
    setSubmitError("");

    let hasErrors = false;

    if (!name) {
      hasErrors = true;
      setNameError("Please enter a name.");
    }

    if (!selectedTeam || !selectedTeam?.key) {
      hasErrors = true;
      setSelectedTeamError("Please select a team.");
    }

    if (hasErrors) return;

    setSubmitLoading(true);
    const { error, data } = await createMission(
      name,
      about,
      selectedTeam?.key!
    );
    if (data && !error) {
      await refetch();
      toggleModal();
    } else {
      setSubmitError(
        "There was an error creating that mission. Please Try again."
      );
    }
    setSubmitLoading(false);
  };

  const teamOptions = teamsData?.length
    ? teamsData.map((team) => {
        return { key: team.id, value: team.name, disabled: false };
      })
    : null;

  if (loading || teamsLoading) {
    return (
      <Loading text="Loading Your Missions..." style={{ marginTop: 48 }} />
    );
  }

  if ((!loading && error) || (!teamsLoading && teamsError)) {
    return (
      <View>
        <Text style={s.errorText}>
          There was an error fetching your missions. Please try again.
        </Text>
        <Button label="Try Again" onPress={refetch} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.root}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={s.header}>Your Missions</Text>
        <IconButton onPress={handleAddTeamPress}>
          <Feather name="plus" size={22} color={COLORS.gray[950]} />
        </IconButton>
      </View>
      <View style={s.teamsList}>
        {data?.length ? (
          data.map((team) => {
            return (
              <Pressable
                onPress={() => handleMissionPress(team)}
                style={({ pressed }) => pressed && { opacity: 0.6 }}
                key={team.id}
              >
                <View style={s.teamContainer}>
                  <Text style={s.teamName}>{team.name}</Text>
                  <Entypo
                    name="chevron-right"
                    size={24}
                    color={COLORS.gray[500]}
                  />
                </View>
              </Pressable>
            );
          })
        ) : (
          <Text style={{ color: COLORS.gray[500] }}>No Missions Yet.</Text>
        )}
      </View>
      <FullScreenModal
        visible={addMissionModalOpen}
        onRequestClose={toggleModal}
        withCloseButton
      >
        <Text style={s.info}>Create a new Mission.</Text>
        <Input
          value={name}
          onChangeText={setName}
          label="Mission Name"
          error={nameError}
        />
        <Input
          value={about}
          onChangeText={setAbout}
          label="Mission Description"
          error={aboutError}
        />
        <DropdownSelect
          selected={selectedTeam}
          setSelected={setSelectedTeam}
          data={teamOptions!}
          label="Select Team"
          error={selectedTeamError}
          placeholder="Select a Team"
          defaultOption={selectedTeam}
        />
        <Button
          label="Add Mission"
          onPress={handleAddPress}
          loading={submitLoading}
        />
        <Text style={s.modalErrorText}>{submitError}</Text>
      </FullScreenModal>
    </ScrollView>
  );
};

export default ManageMissionsScreen;

const s = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 12,
    paddingBottom: 24,
  },
  header: {
    color: COLORS.gray[200],
    fontSize: 24,
    marginVertical: 24,
  },
  info: {
    color: COLORS.gray[500],
    textAlign: "center",
    marginVertical: 48,
    fontSize: 24,
  },
  teamsList: {
    gap: 12,
  },
  errorText: {
    color: COLORS.red[600],
    textAlign: "center",
    marginVertical: 48,
    fontSize: 20,
    paddingHorizontal: 24,
  },
  modalErrorText: {
    marginTop: 24,
    textAlign: "center",
    color: COLORS.red[600],
    fontSize: 18,
    paddingHorizontal: 24,
  },
  teamContainer: {
    backgroundColor: COLORS.gray[900],
    padding: 12,
    borderRadius: 6,
    borderColor: COLORS.gray[800],
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamName: {
    color: COLORS.gray[200],
    fontSize: 20,
    flex: 1,
  },
});
