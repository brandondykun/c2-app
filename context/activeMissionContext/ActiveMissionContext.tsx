import { createContext, useContext, useEffect, useState } from "react";
import { Mission, Team, Profile } from "../../types/types";
import { getTeam } from "../../api/teams";

type ActiveMissionContextType = {
  activeMission: Mission | null;
  activeTeam: Team | null;
  setActiveTeam: React.Dispatch<React.SetStateAction<null | Team>>;
  setActiveMission: React.Dispatch<React.SetStateAction<null | Mission>>;
  activateMission: (mission: Mission) => void;
  activeTeamMembers: Profile[] | null;
};

const ActiveMissionContext = createContext<ActiveMissionContextType>({
  activeMission: null,
  activeTeam: null,
  setActiveTeam: () => {},
  setActiveMission: () => {},
  activateMission: (mission: Mission) => {},
  activeTeamMembers: null,
});

type Props = {
  children: React.ReactNode;
};

function ActiveMissionContextProvider({ children }: Props) {
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [activeTeamMembers, setActiveTeamMembers] = useState<Profile[] | null>(
    null
  );
  const [activeMission, setActiveMission] = useState<Mission | null>(null);

  const activateMission = (mission: Mission) => {
    setActiveMission(mission);
  };

  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (activeTeam) {
        const { error, data } = await getTeam(activeTeam.id);
        if (!error && data) {
          setActiveTeamMembers(data.members);
        }
      }
    };
    fetchTeamDetails();
  }, [activeTeam]);

  const value = {
    activeMission,
    activeTeam,
    setActiveMission,
    setActiveTeam,
    activateMission,
    activeTeamMembers,
  };

  return (
    <ActiveMissionContext.Provider value={value}>
      {children}
    </ActiveMissionContext.Provider>
  );
}

export default ActiveMissionContextProvider;

export const useActiveMission = () => {
  const {
    activeMission,
    activeTeam,
    setActiveMission,
    setActiveTeam,
    activateMission,
    activeTeamMembers,
  } = useContext(ActiveMissionContext);
  return {
    activeMission,
    activeTeam,
    setActiveMission,
    setActiveTeam,
    activateMission,
    activeTeamMembers,
  };
};
