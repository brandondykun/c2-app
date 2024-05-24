import { useCallback, useEffect, useState } from "react";
import { Mission, Team } from "../../types/types";
import { getMission } from "../../api/missions";

const useMission = (id: number | undefined) => {
  const [data, setData] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addTeam = (newTeam: Team) => {
    if (data) {
      const newData: Mission = { ...data, teams: [...data.teams, newTeam] };
      setData(newData);
    }
  };

  const removeTeam = (id: number) => {
    if (data) {
      const updatedTeams = data.teams.filter((team) => team.id !== id);
      const newData: Mission = { ...data, teams: updatedTeams };
      setData(newData);
    }
  };

  const fetchMission = useCallback(async () => {
    setLoading(true);
    if (id) {
      const { error, data } = await getMission(id);
      if (data && !error) {
        setData(data);
      } else {
        setError(error);
      }
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchMission();
  }, [fetchMission]);

  return { data, loading, error, refetch: fetchMission, addTeam, removeTeam };
};

export default useMission;
