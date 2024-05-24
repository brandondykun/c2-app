import { AntDesign } from "@expo/vector-icons";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";
import { useMapState } from "../../../context/mapState/MapStateContext";

const ShowCenterGridButton = () => {
  const { showButtonHelpModal } = useButtonHelpContext();

  const { state, dispatch } = useMapState();

  const onPress = () => {
    dispatch({ type: "TOGGLE_SHOW_CENTER_GRID_BUTTON" });
  };

  return (
    <TaskBarButton
      onPress={onPress}
      onLongPress={() => showButtonHelpModal("SHOW_CENTER_GRID")}
      active={state.showCenterGrid}
    >
      <AntDesign name="plus" size={24} color={COLORS.gray[400]} />
    </TaskBarButton>
  );
};

export default ShowCenterGridButton;
