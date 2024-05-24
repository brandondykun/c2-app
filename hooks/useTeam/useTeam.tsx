import { useCallback, useEffect, useState } from "react";
import { Profile, Team } from "../../types/types";
import { getTeam } from "../../api/teams";

const useTeam = (id: number | undefined) => {
  const [data, setData] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addMember = (newMember: Profile) => {
    if (data) {
      const newData: Team = { ...data, members: [...data.members, newMember] };
      setData(newData);
    }
  };

  const removeMember = (id: number) => {
    if (data) {
      const updatedMembers = data.members.filter(
        (profile) => profile.id !== id
      );
      const newData: Team = { ...data, members: updatedMembers };
      setData(newData);
    }
  };

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    if (id) {
      const { error, data } = await getTeam(id);
      if (data && !error) {
        setData(data);
      } else {
        setError(error);
      }
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  return { data, loading, error, refetch: fetchTeam, addMember, removeMember };
};

export default useTeam;
