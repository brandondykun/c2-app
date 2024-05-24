import { Entypo } from "@expo/vector-icons";
import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import { useMapState } from "../../../context/mapState/MapStateContext";

const GetCoordinateButton = () => {
  const { state, dispatch } = useMapState();
  const { showButtonHelpModal } = useButtonHelpContext();

  const handlePress = () => {
    dispatch({ type: "GET_COORDINATE_PRESS" });
  };

  return (
    <TaskBarButton
      onPress={handlePress}
      onLongPress={() => showButtonHelpModal("GET_COORDINATE")}
      active={state.activeMapState === "GET_COORDINATE"}
    >
      <Entypo name="hair-cross" size={24} color={COLORS.gray[400]} />
    </TaskBarButton>
  );
};

export default GetCoordinateButton;
