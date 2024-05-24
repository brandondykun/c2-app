import { MaterialIcons } from "@expo/vector-icons";
import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import { useMapState } from "../../../context/mapState/MapStateContext";

const AddPointButton = () => {
  const { state, dispatch } = useMapState();
  const { showButtonHelpModal } = useButtonHelpContext();

  const handlePress = () => {
    dispatch({ type: "ADD_POINT_BUTTON_PRESS" });
  };

  return (
    <TaskBarButton
      onPress={handlePress}
      onLongPress={() => showButtonHelpModal("ADD_POINT")}
      active={state.activeMapState === "ADD_POINT"}
    >
      <MaterialIcons
        name="add-location-alt"
        size={24}
        color={COLORS.gray[400]}
      />
    </TaskBarButton>
  );
};

export default AddPointButton;
