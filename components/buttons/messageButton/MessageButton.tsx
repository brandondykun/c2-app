import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import { useMapState } from "../../../context/mapState/MapStateContext";
import { useTeamChatContext } from "../../../context/teamChatContext/TeamChatContext";

const MessageButton = () => {
  const { showButtonHelpModal } = useButtonHelpContext();
  const { dispatch, state } = useMapState();

  const { hasUnreadTeamMessage, setHasUnreadTeamMessage } =
    useTeamChatContext();

  const onPress = () => {
    dispatch({ type: "TOGGLE_MESSAGES" });
    setHasUnreadTeamMessage(false);
  };

  return (
    <TaskBarButton
      onPress={onPress}
      onLongPress={() => showButtonHelpModal("MESSAGES")}
      active={state.activeMenu === "MESSAGES"}
    >
      <View style={{ position: "relative" }}>
        <AntDesign name="message1" size={24} color={COLORS.gray[400]} />
        {hasUnreadTeamMessage && (
          <View
            style={{
              position: "absolute",
              top: -7,
              right: -8,
              backgroundColor: COLORS.gray[100],
              borderRadius: 25,
            }}
          >
            <AntDesign
              name="exclamationcircle"
              size={14}
              color={COLORS.red[500]}
            />
          </View>
        )}
      </View>
    </TaskBarButton>
  );
};

export default MessageButton;
