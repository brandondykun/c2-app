import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { COLORS } from "../../colors/colors";
import { createTeam } from "../../api/teams";
import { Team } from "../../types/types";
import useTeams from "../../hooks/useTeams/useTeams";
import useTypeSafeNavigation from "../../hooks/useTypeSafeNavigation/useTypeSafeNavigation";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";
import FullScreenModal from "../../components/ui/fullScreenModal/FullScreenModal";
import IconButton from "../../components/ui/iconButton/IconButton";
import Loading from "../../components/ui/loading/Loading";

const ManageTeamsScreen = () => {
  const { error, data, loading, refetch, addTeamMember } = useTeams();

  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [about, setAbout] = useState("");
  const [aboutError, setAboutError] = useState("");

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
    setAddTeamModalOpen((prev) => !prev);
    setName("");
    setAbout("");
    setNameError("");
    setAboutError("");
  };
  const handleAddTeamPress = () => {
    toggleModal();
  };

  const handleTeamPress = (team: Team) => {
    navigation.navigate("teamDetailsScreen", {
      id: team.id,
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

    if (hasErrors) return;

    setSubmitLoading(true);
    const { error, data } = await createTeam(name, about);
    if (data && !error) {
      await refetch();
      toggleModal();
    } else {
      setSubmitError(
        "There was an error creating that team. Please Try again."
      );
    }
    setSubmitLoading(false);
  };

  if (loading) {
    return <Loading text="Loading Your Teams..." style={{ marginTop: 48 }} />;
  }

  if (!loading && error) {
    return (
      <View>
        <Text style={s.errorText}>
          There was an error fetching your teams. Please try again.
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
        <Text style={s.header}>Your Teams</Text>
        <IconButton onPress={handleAddTeamPress}>
          <Feather name="plus" size={22} color={COLORS.gray[950]} />
        </IconButton>
      </View>
      <View style={s.teamsList}>
        {data?.length ? (
          data.map((team) => {
            return (
              <Pressable
                onPress={() => handleTeamPress(team)}
                style={({ pressed }) => pressed && { opacity: 0.6 }}
                key={team.id}
              >
                <View style={s.teamContainer}>
                  <Text style={s.teamName}>{team.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      marginRight: 24,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: COLORS.gray[400], fontSize: 18 }}>
                      {team.members.length}
                    </Text>
                    <FontAwesome5
                      name="user-friends"
                      size={14}
                      color={COLORS.gray[400]}
                    />
                  </View>
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
          <Text style={{ color: COLORS.gray[500] }}>No Teams Yet.</Text>
        )}
      </View>
      <FullScreenModal
        visible={addTeamModalOpen}
        onRequestClose={toggleModal}
        withCloseButton
      >
        <Text style={s.info}>Create a new team.</Text>
        <Input
          value={name}
          onChangeText={setName}
          label="Team Name"
          error={nameError}
        />
        <Input
          value={about}
          onChangeText={setAbout}
          label="Team Description"
          error={aboutError}
        />
        <Button
          label="Add Team"
          onPress={handleAddPress}
          loading={submitLoading}
        />
        <Text style={s.modalErrorText}>{submitError}</Text>
      </FullScreenModal>
    </ScrollView>
  );
};

export default ManageTeamsScreen;

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
