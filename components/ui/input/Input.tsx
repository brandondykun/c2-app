import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  TextStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, forwardRef, LegacyRef } from "react";
import { COLORS } from "../../../colors/colors";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

type Props = {
  label?: string;
  error?: string;
  inputStyle?: StyleProp<TextStyle>;
  withoutError?: boolean;
} & TextInputProps;

const Input = forwardRef(
  (
    { label, error, inputStyle, withoutError = false, ...rest }: Props,
    ref: LegacyRef<TextInput> | undefined
  ) => {
    const [focused, setFocused] = useState(false);
    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      rest.onFocus && rest.onFocus(e);
      setFocused(true);
    };
    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      rest.onBlur && rest.onBlur(e);
      setFocused(false);
    };

    return (
      <View style={s.root}>
        {label && (
          <Text style={[s.label, focused && { color: COLORS.gray[100] }]}>
            {label}
          </Text>
        )}
        <TextInput
          style={[
            s.input,
            inputStyle && inputStyle,
            focused && { borderColor: COLORS.gray[100] },
            error ? { borderColor: COLORS.red[600] } : null,
          ]}
          {...rest}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
        />
        {!withoutError && (
          <View style={s.errorContainer}>
            {error && (
              <MaterialIcons
                name="error-outline"
                size={16}
                color={COLORS.red[600]}
              />
            )}
            <Text style={s.error}>{error}</Text>
          </View>
        )}
      </View>
    );
  }
);

export default Input;

const s = StyleSheet.create({
  root: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: COLORS.gray[400],
    marginBottom: 2,
  },
  input: {
    borderColor: COLORS.gray[600],
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    borderRadius: 8,
    fontSize: 18,
    color: COLORS.gray[200],
    marginBottom: 4,
  },
  errorContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  error: {
    minHeight: 20,
    color: COLORS.red[600],
    fontSize: 16,
  },
});
