import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";
import { useMapState } from "../../../context/mapState/MapStateContext";

const TeamButton = () => {
  const { showButtonHelpModal } = useButtonHelpContext();

  const { state, dispatch } = useMapState();

  const onPress = () => {
    dispatch({ type: "TOGGLE_TEAM_MENU" });
  };

  return (
    <TaskBarButton
      onPress={onPress}
      onLongPress={() => showButtonHelpModal("TEAMS")}
      active={state.activeMenu === "TEAM"}
    >
      <FontAwesome name="users" size={24} color={COLORS.gray[400]} />
    </TaskBarButton>
  );
};

export default TeamButton;
