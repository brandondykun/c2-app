import { createContext, useContext, useState, useCallback } from "react";
import { HelpModalVariants } from "../../types/types";

const ModalContext = createContext({
  showModal: (type: string) => {},
  hideModal: () => {},
  modalVisible: false,
  modalText: "",
});

type Props = {
  children: React.ReactNode;
};

function ModalContextProvider({ children }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
    setModalText("");
  }, []);

  const value = {
    showModal,
    hideModal,
    modalVisible,
    modalText,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default ModalContextProvider;

export const useModalContext = () => {
  const { showModal, hideModal, modalVisible, modalText } =
    useContext(ModalContext);
  return { showModal, hideModal, modalVisible, modalText };
};
