import { AntDesign } from "@expo/vector-icons";

import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import { useMapState } from "../../../context/mapState/MapStateContext";

const MessageButton = () => {
  const { showButtonHelpModal } = useButtonHelpContext();
  const { dispatch, state } = useMapState();

  const onPress = () => {
    dispatch({ type: "TOGGLE_MESSAGES" });
  };

  return (
    <TaskBarButton
      onPress={onPress}
      onLongPress={() => showButtonHelpModal("MESSAGES")}
      active={state.activeMenu === "MESSAGES"}
    >
      <AntDesign name="message1" size={24} color={COLORS.gray[400]} />
    </TaskBarButton>
  );
};

export default MessageButton;
