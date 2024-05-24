import { Pressable, StyleSheet, View } from "react-native";
import Text from "../../ui/text/Text";
import { COLORS } from "../../../colors/colors";
import { useRef, useState } from "react";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../ui/iconButton/IconButton";
import { useMapState } from "../../../context/mapState/MapStateContext";

type Tab = "TEAM" | "MISSION";

const MessagesMenu = () => {
  const { dispatch } = useMapState();
  const [activeTab, setActiveTab] = useState<Tab>("TEAM");

  const [text, setText] = useState("");

  const [inputFocused, setInputFocused] = useState(false);

  const onTabPress = (tab: Tab) => {
    setActiveTab(tab);
  };

  const onSendPress = () => {
    console.log("SENDING MESSAGE");
  };

  const onBackPress = () => {
    dispatch({ type: "TOGGLE_MESSAGES" });
  };

  return (
    <View style={s.root}>
      {inputFocused && (
        <View style={s.textPreview}>
          <Text style={{ padding: 4, fontSize: 18 }}>{text}</Text>
        </View>
      )}
      <View style={s.labelAndButtons}>
        <Text style={s.menuLabel}>
          {activeTab === "TEAM" ? "Team " : "Mission "}Chat
        </Text>
        <View style={s.chatTabs}>
          <Pressable onPress={() => onTabPress("TEAM")}>
            <View
              style={[
                s.tab,
                {
                  backgroundColor:
                    activeTab === "TEAM" ? COLORS.gray[800] : COLORS.gray[900],
                },
              ]}
            >
              <Text style={{ fontSize: 18 }}>Team</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => onTabPress("MISSION")}>
            <View
              style={[
                s.tab,
                {
                  backgroundColor:
                    activeTab === "MISSION"
                      ? COLORS.gray[800]
                      : COLORS.gray[900],
                },
              ]}
            >
              <Text style={{ fontSize: 18 }}>Mission</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={s.messageTabContent}>
        <View style={s.messagesContainer}></View>
        <View style={s.inputContainer}>
          <IconButton
            onPress={onBackPress}
            style={{ backgroundColor: COLORS.gray[400] }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.gray[900]} />
          </IconButton>
          <View style={s.inputWrapper}>
            <Input
              value={text}
              onChangeText={setText}
              inputStyle={{ marginBottom: 0, borderRadius: 20 }}
              withoutError
              onFocus={() => {
                setInputFocused(true);
              }}
              onBlur={() => {
                setInputFocused(false);
              }}
            />
          </View>
          <Button label="Send" onPress={onSendPress} variant="accent" />
        </View>
      </View>
    </View>
  );
};

export default MessagesMenu;

const s = StyleSheet.create({
  root: {
    flex: 1,
    minWidth: "100%",
    position: "relative",
  },
  menuLabel: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 12,
    paddingVertical: 6,
    // marginBottom: 24,
    color: COLORS.lime[500],
  },
  labelAndButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatTabs: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  messageTabContent: {
    flex: 1,
    backgroundColor: COLORS.gray[800],
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: COLORS.gray[700],
    borderRadius: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    gap: 6,
  },
  inputWrapper: {
    flex: 1,
  },
  textPreview: {
    position: "absolute",
    backgroundColor: COLORS.gray[900],
    opacity: 0.8,
    top: 50,
    right: "30%",
    left: "30%",
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    minHeight: 30,
  },
});
