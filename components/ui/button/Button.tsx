import {
  Pressable,
  GestureResponderEvent,
  Text,
  TextStyle,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";

import { COLORS } from "../../../colors/colors";
type Props = {
  style?: StyleProp<ViewStyle>;
  rootStyles?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "accent";
};
const Button = ({
  style,
  rootStyles,
  textStyle,
  onPress,
  disabled,
  loading,
  label,
  variant = "primary",
}: Props) => {
  const isDisabled = disabled || loading;

  const buttonStyles =
    variant === "primary"
      ? s.primary
      : variant === "secondary"
      ? s.secondary
      : s.accent;
  const textStyles =
    variant === "primary"
      ? s.primaryText
      : variant === "secondary"
      ? s.secondaryText
      : s.accentText;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        rootStyles && rootStyles,
        pressed && !isDisabled && s.pressed,
        isDisabled && s.disabled,
      ]}
      disabled={disabled || loading}
    >
      <View style={[s.root, buttonStyles, style]}>
        <Text style={[s.text, textStyles, textStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const s = StyleSheet.create({
  root: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  primary: {
    backgroundColor: COLORS.gray[400],
  },
  secondary: {
    backgroundColor: COLORS.gray[950],
    borderWidth: 1,
    borderColor: COLORS.gray[400],
  },
  accent: {
    backgroundColor: COLORS.lime[700],
    borderWidth: 1,
    borderColor: COLORS.lime[700],
  },
  primaryText: {
    color: COLORS.gray[950],
  },
  secondaryText: {
    color: COLORS.gray[300],
  },
  accentText: {
    color: COLORS.gray[950],
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.5,
  },
});
