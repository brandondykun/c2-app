import { MaterialIcons } from "@expo/vector-icons";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";
import { useMapState } from "../../../context/mapState/MapStateContext";

const ShowCurrentGridButton = () => {
  const { showButtonHelpModal } = useButtonHelpContext();

  const { state, dispatch } = useMapState();

  const onPress = () => {
    dispatch({ type: "TOGGLE_SHOW_CURRENT_GRID" });
  };

  return (
    <TaskBarButton
      onPress={onPress}
      onLongPress={() => showButtonHelpModal("SHOW_CURRENT_GRID")}
      active={state.showCurrentGrid}
    >
      <MaterialIcons name="gps-fixed" size={24} color={COLORS.gray[400]} />
    </TaskBarButton>
  );
};

export default ShowCurrentGridButton;
