import {
  Modal as RNModal,
  ModalProps,
  View,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { COLORS } from "../../../colors/colors";
import { StyleProp, ViewStyle } from "react-native";
import Button from "../button/Button";

type Props = {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  withCloseButton?: boolean;
  title?: string;
} & ModalProps;

const FullScreenModal = ({
  visible,
  onRequestClose,
  containerStyle,
  withCloseButton = true,
  modalStyle,
  title,
  children,
}: Props) => {
  return (
    <RNModal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
      style={{ paddingTop: 300 }}
      transparent={true}
      supportedOrientations={["landscape", "portrait"]}
    >
      <View style={[s.centeredView, containerStyle]}>
        <View style={[s.modalView, modalStyle]}>
          {title && <Text style={s.title}>{title}</Text>}
          <View style={{ flexGrow: 1 }}>{children}</View>
          {withCloseButton && (
            <View style={{ marginTop: 24 }}>
              <Button
                label="Close"
                variant="secondary"
                onPress={onRequestClose}
                style={{ backgroundColor: COLORS.gray[900] }}
              />
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
};

export default FullScreenModal;

const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 50,
    backgroundColor: COLORS.gray[900],
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    paddingBottom: 24,
  },
  title: {
    color: COLORS.gray[300],
    textAlign: "center",
    marginTop: 24,
    marginBottom: 36,
    fontSize: 24,
  },
});
