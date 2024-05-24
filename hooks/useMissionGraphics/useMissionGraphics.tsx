import { useCallback, useEffect, useState } from "react";
import { getMissionGraphics } from "../../api/points";
import { MissionGraphics } from "../../types/types";

const useMissionGraphics = (missionId: number) => {
  const [data, setData] = useState<MissionGraphics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMissionGraphics = useCallback(async () => {
    setLoading(true);
    const { error, data } = await getMissionGraphics(missionId);
    if (data && !error) {
      setData(data);
    } else {
      setError(error);
    }
    setLoading(false);
  }, [missionId]);

  useEffect(() => {
    fetchMissionGraphics();
  }, [fetchMissionGraphics]);

  return { data, loading, error, refetch: fetchMissionGraphics };
};

export default useMissionGraphics;
