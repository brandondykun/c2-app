import { useButtonHelpContext } from "../../context/buttonHelpContext/ButtonHelpContext";
import { View, Text, Button } from "react-native";
import Modal from "../ui/modal/Modal";
import { COLORS } from "../../colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { useModalContext } from "../../context/modalContext/ModalContext";

const MenuModal = () => {
  const { hideModal, modalVisible, modalText } = useModalContext();

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={hideModal}
      transparent={false}
      containerStyle={{
        backgroundColor: "rgba(0,0,0,0.5)",
        marginTop: 0,
      }}
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
      }}
      withCloseButton={false}
      modalStyle={{
        width: 300,
        minHeight: 100,
        // alignSelf: "center",
        backgroundColor: COLORS.gray[900],
        borderRadius: 10,
        padding: 18,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Ionicons
          name="help-circle-outline"
          size={26}
          color={COLORS.gray[600]}
        />
        <Text
          style={{
            color: COLORS.gray[600],
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontSize: 18,
          }}
        >
          Help Text
        </Text>
      </View>
      <Text style={{ color: COLORS.gray[200], fontSize: 18 }}>{modalText}</Text>
      <Button title="Close" onPress={hideModal} />
    </Modal>
  );
};

export default MenuModal;
