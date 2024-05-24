import { AntDesign } from "@expo/vector-icons";

import TaskBarButton from "../../ui/taskBarButton/TaskBarButton";
import { useButtonHelpContext } from "../../../context/buttonHelpContext/ButtonHelpContext";
import { COLORS } from "../../../colors/colors";
import useTypeSafeNavigation from "../../../hooks/useTypeSafeNavigation/useTypeSafeNavigation";

const BackButton = () => {
  const { showButtonHelpModal } = useButtonHelpContext();

  const navigation = useTypeSafeNavigation();

  const handlePress = () => {
    navigation.navigate("homeScreen");
  };

  return (
    <TaskBarButton
      onPress={handlePress}
      onLongPress={() => showButtonHelpModal("BACK")}
    >
      <AntDesign name="arrowleft" size={24} color={COLORS.gray[400]} />
    </TaskBarButton>
  );
};

export default BackButton;
