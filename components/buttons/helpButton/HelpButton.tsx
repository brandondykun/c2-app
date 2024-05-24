import { Ionicons } from "@expo/vector-icons";

import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { COLORS } from "../../../colors/colors";

const HelpButton = () => {
  return (
    <TaskBarButton
      onPress={() => console.log("PRESSED 5")}
      onLongPress={() => console.log("LONG PRESSED 5")}
    >
      <Ionicons name="help" size={24} color={COLORS.gray[400]} />
    </TaskBarButton>
  );
};

export default HelpButton;
