import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Text from "../../ui/text/Text";
import { COLORS } from "../../../colors/colors";
import { useEffect, useRef, useState } from "react";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../ui/iconButton/IconButton";
import { useMapState } from "../../../context/mapState/MapStateContext";
import { useActiveMission } from "../../../context/activeMissionContext/ActiveMissionContext";
import { useAuthContext } from "../../../context/authContext/AuthContext";
import { useTeamChatContext } from "../../../context/teamChatContext/TeamChatContext";

type Tab = "TEAM" | "MISSION";

const MessagesMenu = () => {
  const { dispatch } = useMapState();
  const { activeTeam } = useActiveMission();
  const [activeTab, setActiveTab] = useState<Tab>("TEAM");
  const { profile } = useAuthContext();

  const [text, setText] = useState("");

  const [inputFocused, setInputFocused] = useState(false);

  const { sendMessage, messages, loading } = useTeamChatContext();

  const scrollViewRef = useRef<ScrollView>(null!);
  const inputRef = useRef<TextInput>(null!);

  const onTabPress = (tab: Tab) => {
    setActiveTab(tab);
  };

  const onSendPress = () => {
    sendMessage(text, profile.id!, activeTeam?.id!);
    setText("");
    setInputFocused(false);
    inputRef.current.blur();
  };

  useEffect(() => {
    // scroll to bottom with animation when new message is added
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    // scroll to bottom without animation when menu opens
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }, 0);
    }
  }, []);

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
          {activeTab === "TEAM" ? "Team Chat" : "Mission Chat"}
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
        <ScrollView
          style={s.messagesView}
          contentContainerStyle={s.messagesContainer}
          ref={scrollViewRef}
        >
          {messages.length ? (
            messages.map((message) => {
              if (message.sender.id === profile.id) {
                return (
                  <View
                    style={[s.baseMessageBubble, s.sentMessage]}
                    key={message.id}
                  >
                    <Text>{message.text}</Text>
                  </View>
                );
              } else {
                return (
                  <View key={message.id}>
                    <Text style={{ paddingLeft: 12, color: COLORS.gray[300] }}>
                      {message.sender.username}
                    </Text>
                    <View style={[s.baseMessageBubble, s.receivedMessage]}>
                      <Text>{message.text}</Text>
                    </View>
                  </View>
                );
              }
            })
          ) : (
            <Text style={s.noMessagesText}>No Messages</Text>
          )}
        </ScrollView>
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
              ref={inputRef}
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
  messagesView: {
    borderRadius: 6,
    backgroundColor: COLORS.gray[700],
    flexGrow: 1,
    overflow: "hidden",
  },
  messagesContainer: {
    borderRadius: 6,
    padding: 6,
    gap: 4,
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
  baseMessageBubble: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    maxWidth: "70%",
  },
  sentMessage: {
    backgroundColor: COLORS.sky[800],
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: COLORS.lime[800],
    alignSelf: "flex-start",
  },
  noMessagesText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 18,
    color: COLORS.gray[400],
  },
});
