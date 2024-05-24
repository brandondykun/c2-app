import { useCallback, useEffect, useState } from "react";
import { Team, Profile } from "../../types/types";
import { getTeams } from "../../api/teams";
import { useAuthContext } from "../../context/authContext/AuthContext";

const useTeams = () => {
  const [data, setData] = useState<Team[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { profile } = useAuthContext();

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    const { error, data } = await getTeams();

    if (data && !error) {
      setData(data);
    } else {
      setError(error);
    }
    setLoading(false);
  }, [profile]);

  const addTeamMember = (teamId: number, profile: Profile) => {
    if (data) {
      const updatedTeams = data.map((team) => {
        if (team.id === teamId) {
          team.members.push(profile);
        }
        return team;
      });
      setData(updatedTeams);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return { data, loading, error, refetch: fetchTeams, addTeamMember };
};

export default useTeams;
