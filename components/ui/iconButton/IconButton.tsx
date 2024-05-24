import {
  Pressable,
  GestureResponderEvent,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";

import { COLORS } from "../../../colors/colors";
type Props = {
  style?: StyleProp<ViewStyle>;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
};
const IconButton = ({ style, onPress, disabled, loading, children }: Props) => {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && !isDisabled && s.pressed,
        isDisabled && s.disabled,
      ]}
      disabled={disabled || loading}
    >
      <View style={[s.root, style]}>{children}</View>
    </Pressable>
  );
};

export default IconButton;

const s = StyleSheet.create({
  root: {
    backgroundColor: COLORS.lime[600],
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.5,
  },
});
