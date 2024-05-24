import { createContext, useContext, useReducer, useRef } from "react";
import {
  MapReducerState,
  mapStateReducer,
  mapReducerInitialState,
  MapStateReducerAction,
} from "../../reducers/mapStateReducer/mapStateReducer";
import MapView from "react-native-maps";
import { Coordinate } from "../../types/types";

type MapStateContextType = {
  dispatch: React.Dispatch<MapStateReducerAction>;
  state: MapReducerState;
  mapRef: React.MutableRefObject<MapView | null>;
};

const MapStateContext = createContext<MapStateContextType>({
  dispatch: () => {},
  state: mapReducerInitialState,
  mapRef: null!,
});

type Props = {
  children: React.ReactNode;
};

function MapStateContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(mapStateReducer, mapReducerInitialState);

  const mapRef = useRef<MapView | null>(null!);

  const value = {
    state,
    dispatch,
    mapRef,
  };

  return (
    <MapStateContext.Provider value={value}>
      {children}
    </MapStateContext.Provider>
  );
}

export default MapStateContextProvider;

export const useMapState = () => {
  const { state, dispatch, mapRef } = useContext(MapStateContext);
  return { state, dispatch, mapRef };
};
