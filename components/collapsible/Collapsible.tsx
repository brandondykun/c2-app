import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../colors/colors";
import Text from "../ui/text/Text";

type Props = {
  children: React.ReactNode;
  title: React.ReactNode;
  initExpanded?: boolean;
};
const Collapsible = ({ title, initExpanded, children }: Props) => {
  return (
    <CollapsibleView
      style={s.root}
      title={
        <Text style={{ fontWeight: "bold", paddingLeft: 8 }}>{title}</Text>
      }
      arrowStyling={{
        color: COLORS.gray[200],
        size: 14,
        thickness: 2,
        rounded: true,
      }}
      titleStyle={{
        alignSelf: "flex-start",
        paddingHorizontal: 0,
      }}
      initExpanded={initExpanded ? initExpanded : false}
    >
      <View style={s.content}>{children}</View>
    </CollapsibleView>
  );
};

export default Collapsible;

const s = StyleSheet.create({
  root: {
    backgroundColor: COLORS.gray[800],
    borderWidth: 0,
    marginHorizontal: 0,
    borderRadius: 8,
    marginBottom: 0,
  },
  content: {
    paddingTop: 8,
    paddingLeft: 15,
  },
});
