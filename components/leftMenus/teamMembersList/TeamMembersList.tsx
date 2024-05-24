import { Pressable, StyleSheet, View } from "react-native";
import Text from "../../ui/text/Text";
import { COLORS } from "../../../colors/colors";
import { useActiveMission } from "../../../context/activeMissionContext/ActiveMissionContext";
import { useAuthContext } from "../../../context/authContext/AuthContext";

const TeamMembersList = () => {
  const { activeTeamMembers } = useActiveMission();
  const { profile } = useAuthContext();

  return (
    <View style={s.root}>
      <Text style={s.menuLabel}>Team Members</Text>
      {activeTeamMembers
        ?.filter((member) => {
          return member.id !== profile.id;
        })
        .map((profile) => {
          return (
            <Pressable key={profile.id}>
              <View style={s.member}>
                <Text style={s.username}>{profile.username}</Text>
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

export default TeamMembersList;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: 300,
  },
  menuLabel: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 12,
    paddingVertical: 6,
    color: COLORS.lime[500],
  },
  member: {
    paddingVertical: 6,
  },
  username: {
    fontSize: 18,
  },
});
