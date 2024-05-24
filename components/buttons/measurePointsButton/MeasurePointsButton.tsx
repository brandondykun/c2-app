import { FontAwesome5 } from "@expo/vector-icons";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";
import { useMapState } from "../../../context/mapState/MapStateContext";

const MeasurePointsButton = () => {
  const { showButtonHelpModal } = useButtonHelpContext();

  const { state, dispatch } = useMapState();

  const onPress = () => {
    dispatch({ type: "MEASURE_POINTS_PRESS" });
  };

  return (
    <TaskBarButton
      onPress={onPress}
      onLongPress={() => showButtonHelpModal("MEASURE_POINTS")}
      active={state.activeMapState === "MEASURE_POINTS"}
    >
      <FontAwesome5 name="ruler-combined" size={24} color={COLORS.gray[400]} />
    </TaskBarButton>
  );
};

export default MeasurePointsButton;
