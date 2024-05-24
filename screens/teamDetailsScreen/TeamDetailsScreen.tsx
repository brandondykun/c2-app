import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../../App";
import { COLORS } from "../../colors/colors";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { Profile } from "../../types/types";
import { searchProfiles } from "../../api/profile";
import { addMemberToTeam, removeMemberFromTeam } from "../../api/teams";
import useTeam from "../../hooks/useTeam/useTeam";
import Button from "../../components/ui/button/Button";
import IconButton from "../../components/ui/iconButton/IconButton";
import FullScreenModal from "../../components/ui/fullScreenModal/FullScreenModal";
import Input from "../../components/ui/input/Input";
import Loading from "../../components/ui/loading/Loading";

const TeamDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "teamDetailsScreen">>();

  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const [userName, setUsername] = useState("");
  const [userNameError, setUsernameError] = useState("");

  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchComplete, setSearchComplete] = useState(false);

  const team = route.params?.team;
  const id = route.params?.id;

  const { profile: authProfile } = useAuthContext();
  const { data, error, loading, refetch, addMember, removeMember } =
    useTeam(id);

  const teamData = team ? team : data;

  const toggleAddTeamMemberModal = () => {
    setAddMemberModalVisible((prev) => !prev);
  };

  const handleSearch = async () => {
    let hasErrors = false;
    setUsernameError("");

    if (!userName) {
      setUsernameError("Please enter a username.");
      hasErrors = true;
    }

    if (hasErrors) return;
    setSearchLoading(true);
    const { data, error } = await searchProfiles(userName);
    if (data && !error) {
      setSearchResults(data);
    } else {
      setSearchError("There was an error with that search. Please Try again.");
    }
    setSearchComplete(true);
    setSearchLoading(false);
  };

  const handleAddTeamMemberPress = async (profile: Profile) => {
    if (teamData) {
      const { error, data } = await addMemberToTeam(teamData.id, profile.id!);
      if (data && !error) {
        addMember(profile);
      }
    }
  };

  const handleRemovePress = async (teamId: number, id: number) => {
    const { data, error } = await removeMemberFromTeam(teamId, id);
    if (!error) {
      removeMember(id);
    }
  };

  const teamProfileIds = data?.members.map((profile) => profile.id);

  if (loading) {
    return <Loading text="Loading Team..." />;
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
              {teamData?.name}
            </Text>
          </View>
          <View>
            <Text style={{ color: COLORS.gray[500], fontSize: 18 }}>
              Description
            </Text>
            <Text style={{ color: COLORS.gray[300], fontSize: 18 }}>
              {teamData?.about}
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
            <Text style={{ color: COLORS.gray[200], fontSize: 24 }}>
              Team Members
            </Text>
            <IconButton onPress={toggleAddTeamMemberModal}>
              <Feather name="plus" size={22} color={COLORS.gray[950]} />
            </IconButton>
          </View>
          <View style={{ gap: 10 }}>
            {teamData?.members &&
              teamData.members.map((profile) => {
                return (
                  <View key={profile.id} style={s.profileCard}>
                    <Text style={{ color: COLORS.gray[200], fontSize: 18 }}>
                      {profile.username === authProfile.username
                        ? "You"
                        : profile.username}
                    </Text>
                    {profile.id !== authProfile.id && (
                      <IconButton
                        onPress={() =>
                          handleRemovePress(teamData.id, profile.id!)
                        }
                        style={{ backgroundColor: COLORS.red[600] }}
                      >
                        <Ionicons
                          name="person-remove-sharp"
                          size={16}
                          color="black"
                        />
                      </IconButton>
                    )}
                  </View>
                );
              })}
          </View>
        </View>
      </View>
      <FullScreenModal
        title="Add Member"
        withCloseButton
        visible={addMemberModalVisible}
        onRequestClose={toggleAddTeamMemberModal}
      >
        <Input
          value={userName}
          onChangeText={setUsername}
          label="Search By Username"
          error={userNameError}
        />
        <View style={{ flex: 1, gap: 12 }}>
          {searchComplete && searchResults.length && !searchError ? (
            searchResults
              .filter((profile) => {
                return !teamProfileIds?.includes(profile.id!);
              })
              .map((profile) => {
                return (
                  <View
                    key={profile.id}
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
                      {profile.username}
                    </Text>
                    <IconButton
                      onPress={() => handleAddTeamMemberPress(profile!)}
                    >
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
              Search for a user by username.
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

export default TeamDetailsScreen;

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
