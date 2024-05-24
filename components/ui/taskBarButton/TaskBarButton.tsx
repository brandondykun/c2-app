import { Pressable, StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";

import { GestureResponderEvent } from "react-native";
import { COLORS } from "../../../colors/colors";

type Props = {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  active?: boolean;
  children: React.ReactNode;
};

const TaskBarButton = ({ onPress, onLongPress, active, children }: Props) => {
  const handleLongPress = (e: GestureResponderEvent) => {
    if (onLongPress) {
      Haptics.impactAsync();
      onLongPress(e);
    }
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      Haptics.selectionAsync();
      onPress(e);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={({ pressed }) => pressed && { opacity: 0.5 }}
    >
      <View
        style={{
          ...s.root,
          backgroundColor: active ? COLORS.gray[700] : COLORS.gray[800],
          borderColor: active ? COLORS.lime[700] : COLORS.gray[900],
        }}
      >
        {children}
      </View>
    </Pressable>
  );
};

export default TaskBarButton;

const s = StyleSheet.create({
  root: {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray[800],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.gray[900],
    borderRadius: 3,
  },
});
