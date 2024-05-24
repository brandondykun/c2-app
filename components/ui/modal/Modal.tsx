import {
  Modal as RNModal,
  ModalProps,
  View,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../../colors/colors";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  withCloseButton?: boolean;
} & ModalProps;

const Modal = ({
  visible,
  onRequestClose,
  containerStyle,
  withCloseButton = true,
  modalStyle,
  children,
}: Props) => {
  return (
    <RNModal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
      style={{ paddingTop: 300 }}
      transparent={true}
      supportedOrientations={["landscape", "portrait"]}
    >
      <View style={[s.centeredView, containerStyle]}>
        <View style={[s.modalView, modalStyle]}>
          <View>{children}</View>
          {withCloseButton && <Button title="Close" onPress={onRequestClose} />}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
