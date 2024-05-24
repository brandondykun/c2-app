import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../../colors/colors";
import { ActivityIndicator } from "react-native";

type Props = {
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Loading = ({ text, style, textStyle }: Props) => {
  return (
    <View style={[s.root, style && style]}>
      <Text style={[s.text, textStyle]}>{text ? text : "Loading..."}</Text>
      <ActivityIndicator color={COLORS.lime[600]} size="large" />
    </View>
  );
};

export default Loading;

const s = StyleSheet.create({
  root: {
    padding: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.gray[500],
    textAlign: "center",
    fontSize: 22,
    marginBottom: 24,
  },
});
