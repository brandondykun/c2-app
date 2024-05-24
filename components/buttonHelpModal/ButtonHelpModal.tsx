import { useButtonHelpContext } from "../../context/buttonHelpContext/ButtonHelpContext";
import { View, Text, Button } from "react-native";
import Modal from "../ui/modal/Modal";
import { COLORS } from "../../colors/colors";
import { Ionicons } from "@expo/vector-icons";

const ButtonHelpModal = () => {
  const { hideButtonHelpModal, modalVisible, modalText } =
    useButtonHelpContext();

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={hideButtonHelpModal}
      transparent={false}
      containerStyle={{
        backgroundColor: "rgba(0,0,0,0.7)",
        marginTop: 0,
      }}
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
      }}
      withCloseButton={false}
      modalStyle={{
        maxWidth: 400,
        minHeight: 100,
        backgroundColor: COLORS.gray[800],
        borderRadius: 10,
        padding: 18,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: COLORS.gray[700],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 24,
          alignItems: "center",
        }}
      >
        <Ionicons
          name="help-circle-outline"
          size={24}
          color={COLORS.gray[500]}
        />
        <Text
          style={{
            color: COLORS.gray[500],
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontSize: 18,
          }}
        >
          Button Help
        </Text>
      </View>
      <Text style={{ color: COLORS.gray[200], fontSize: 18, marginBottom: 24 }}>
        {modalText}
      </Text>
      <Button title="Close" onPress={hideButtonHelpModal} />
    </Modal>
  );
};

export default ButtonHelpModal;
