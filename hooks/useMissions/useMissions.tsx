import { useCallback, useEffect, useState } from "react";
import { Mission, Profile } from "../../types/types";
import { getMissions } from "../../api/missions";
import { useAuthContext } from "../../context/authContext/AuthContext";

const useMissions = () => {
  const [data, setData] = useState<Mission[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { profile } = useAuthContext();

  const fetchMissions = useCallback(async () => {
    setLoading(true);
    const { error, data } = await getMissions();
    if (data && !error) {
      setData(data);
    } else {
      setError(error);
    }
    setLoading(false);
  }, [profile]);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  return { data, loading, error, refetch: fetchMissions };
};

export default useMissions;
