import {
  Text as RNText,
  StyleSheet,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { COLORS } from "../../../colors/colors";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
} & TextProps;
const Text = ({ children, style, ...rest }: Props) => {
  return (
    <RNText style={[s.root, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;

const s = StyleSheet.create({
  root: {
    color: COLORS.gray[200],
  },
});
