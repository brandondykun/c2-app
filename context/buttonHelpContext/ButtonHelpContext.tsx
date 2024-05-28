import { createContext, useContext, useState, useCallback } from "react";
import { HelpModalVariants } from "../../types/types";

const ButtonHelpContext = createContext({
  showButtonHelpModal: (type: HelpModalVariants) => {},
  hideButtonHelpModal: () => {},
  modalVisible: false,
  modalText: "",
});

type Props = {
  children: React.ReactNode;
};

function ButtonHelpContextProvider({ children }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const showButtonHelpModal = useCallback((type: HelpModalVariants) => {
    if (type === "MESSAGES") {
      setModalText("Send messages to your team.");
    } else if (type === "HELP") {
      setModalText("Get more Help about the app.");
    } else if (type === "LAYERS") {
      setModalText("View the layers in the map.");
    } else if (type === "BACK") {
      setModalText("Go back to home screen.");
    } else if (type === "ADD_POINT") {
      setModalText("Add a point on the map.");
    } else if (type === "GET_COORDINATE") {
      setModalText("Get a coordinate from the map.");
    } else if (type === "MEASURE_POINTS") {
      setModalText("Measure distance and direction between two points.");
    } else if (type === "SHOW_CENTER_GRID") {
      setModalText("Toggle center grid indicator.");
    } else if (type === "TEAMS") {
      setModalText("View members of your current team.");
    } else if (type === "SHOW_CURRENT_GRID") {
      setModalText(
        "Toggle current grid display. This will display your grid and altitude."
      );
    }
    setModalVisible(true);
  }, []);

  const hideButtonHelpModal = useCallback(() => {
    setModalVisible(false);
    setModalText("");
  }, []);

  const value = {
    showButtonHelpModal,
    hideButtonHelpModal,
    modalVisible,
    modalText,
  };

  return (
    <ButtonHelpContext.Provider value={value}>
      {children}
    </ButtonHelpContext.Provider>
  );
}

export default ButtonHelpContextProvider;

export const useButtonHelpContext = () => {
  const { showButtonHelpModal, hideButtonHelpModal, modalVisible, modalText } =
    useContext(ButtonHelpContext);
  return { showButtonHelpModal, hideButtonHelpModal, modalVisible, modalText };
};
