import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useActiveMission } from "../activeMissionContext/ActiveMissionContext";
import { TeamMessage } from "../../types/types";
import { useMapState } from "../mapState/MapStateContext";
import { Platform } from "react-native";
import { getTeamChats } from "../../api/chats";

type TeamChatContextType = {
  sendMessage: (message: string, from: number, teamId: number) => void;
  messages: TeamMessage[];
  loading: boolean;
  hasUnreadTeamMessage: boolean;
  setHasUnreadTeamMessage: React.Dispatch<React.SetStateAction<boolean>>;
  teamChatConnected: boolean;
};

const TeamChatContext = createContext<TeamChatContextType>({
  sendMessage: (message: string, from: number, teamId: number) => {},
  messages: [],
  loading: true,
  hasUnreadTeamMessage: false,
  setHasUnreadTeamMessage: () => {},
  teamChatConnected: false,
});

type Props = {
  children: React.ReactNode;
};

function TeamChatContextProvider({ children }: Props) {
  const { activeTeam } = useActiveMission();
  const { state } = useMapState();

  const [hasUnreadTeamMessage, setHasUnreadTeamMessage] = useState(false);
  const [teamChatConnected, setTeamChatConnected] = useState(false);

  const ws = useRef<WebSocket | null>(null);

  const [messages, setMessages] = useState<TeamMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socketUrl =
      Platform.OS === "ios"
        ? `ws://0.0.0.0:8000/api/v1/ws/chat/${activeTeam?.id}/`
        : `ws://10.0.2.2:8000/api/v1/ws/chat/${activeTeam?.id}/`;

    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      setTeamChatConnected(true);
    };

    ws.current.onclose = () => {
      setTeamChatConnected(false);
    };

    return () => {
      if (ws.current?.readyState === 1) {
        ws.current.close();
      } else {
        ws.current?.addEventListener("open", () => {
          ws.current?.close();
          setTeamChatConnected(false);
        });
      }
    };
  }, [activeTeam]);

  useEffect(() => {
    if (ws.current) {
      ws.current.onmessage = (message) => {
        const parsedMessage = JSON.parse(message.data);
        setMessages((prev) => [...prev, parsedMessage]);
        if (state.activeMenu !== "MESSAGES") {
          setHasUnreadTeamMessage(true);
        }
      };
    }
  }, [ws, state.activeMenu]);

  useEffect(() => {
    const getMessages = async () => {
      if (activeTeam?.id) {
        setLoading(true);
        const { data, error } = await getTeamChats(activeTeam.id);
        if (data && !error) {
          setMessages(data);
        }
      }
      setLoading(false);
    };
    getMessages();
  }, [activeTeam]);

  const sendMessage = (message: string, from: number, teamId: number) => {
    const data = {
      message,
      from,
      team: teamId,
    };
    ws.current?.send(JSON.stringify(data));
  };

  const value = {
    sendMessage,
    messages,
    loading,
    hasUnreadTeamMessage,
    setHasUnreadTeamMessage,
    teamChatConnected,
  };

  return (
    <TeamChatContext.Provider value={value}>
      {children}
    </TeamChatContext.Provider>
  );
}

export default TeamChatContextProvider;

export const useTeamChatContext = () => {
  const {
    sendMessage,
    messages,
    loading,
    hasUnreadTeamMessage,
    setHasUnreadTeamMessage,
    teamChatConnected,
  } = useContext(TeamChatContext);
  return {
    sendMessage,
    messages,
    loading,
    hasUnreadTeamMessage,
    setHasUnreadTeamMessage,
    teamChatConnected,
  };
};
