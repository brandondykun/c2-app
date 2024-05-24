import { createContext, useContext, useEffect, useState } from "react";
import { Coordinate, Point } from "../../types/types";
import { getMissionGraphics } from "../../api/points";
import { useActiveMission } from "../activeMissionContext/ActiveMissionContext";

type MapGraphicsContextType = {
  points: Point[];
  addPoint: (newPoint: Point) => void;
  editPoint: (updatedPoint: Point) => void;
  hidePoint: (pointId: number) => void;
  showPoint: (pointId: number) => void;
};

const MapGraphicsContext = createContext<MapGraphicsContextType>({
  points: [],
  addPoint: (newPoint: Point) => {},
  editPoint: (updatedPoint: Point) => {},
  hidePoint: (pointId: number) => {},
  showPoint: (pointId: number) => {},
});

type Props = {
  children: React.ReactNode;
};

function MapGraphicsContextProvider({ children }: Props) {
  const [points, setPoints] = useState<Point[]>(null!);

  const { activeMission } = useActiveMission();

  useEffect(() => {
    const fetchGraphics = async () => {
      if (activeMission) {
        const { error, data } = await getMissionGraphics(activeMission.id);
        if (data && !error) {
          const pointsWithVisBool: Point[] = data.mission_points.map(
            (point) => {
              return { ...point, visible: true };
            }
          );
          setPoints(pointsWithVisBool);
        }
      }
    };
    fetchGraphics();
  }, [activeMission]);

  const addPoint = (newPoint: Point) => {
    setPoints((prev) => [...prev, newPoint]);
  };

  const editPoint = (updatedPoint: Point) => {
    setPoints((prev) => {
      return prev.map((point) => {
        if (point.id === updatedPoint.id) {
          return updatedPoint;
        }
        return point;
      });
    });
  };

  const hidePoint = (pointId: number) => {
    setPoints((prev) => {
      return prev.map((point) => {
        if (point.id === pointId) {
          return { ...point, visible: false };
        }
        return point;
      });
    });
  };

  const showPoint = (pointId: number) => {
    setPoints((prev) => {
      return prev.map((point) => {
        if (point.id === pointId) {
          return { ...point, visible: true };
        }
        return point;
      });
    });
  };

  const value = {
    points,
    addPoint,
    editPoint,
    hidePoint,
    showPoint,
  };

  return (
    <MapGraphicsContext.Provider value={value}>
      {children}
    </MapGraphicsContext.Provider>
  );
}

export default MapGraphicsContextProvider;

export const useMapGraphics = () => {
  const { points, addPoint, editPoint, hidePoint, showPoint } =
    useContext(MapGraphicsContext);
  return { points, addPoint, editPoint, hidePoint, showPoint };
};
