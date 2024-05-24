import { Ionicons } from "@expo/vector-icons";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";
import { useMapState } from "../../../context/mapState/MapStateContext";

const LayersButton = () => {
  const { showButtonHelpModal } = useButtonHelpContext();

  const { state, dispatch } = useMapState();

  const onPress = () => {
    dispatch({ type: "LAYERS_BUTTON_PRESS" });
  };

  return (
    <TaskBarButton
      onPress={onPress}
      onLongPress={() => showButtonHelpModal("LAYERS")}
      active={state.activeMapState === "VIEW_LAYERS"}
    >
      <Ionicons name="layers-sharp" size={24} color={COLORS.gray[400]} />
    </TaskBarButton>
  );
};

export default LayersButton;
