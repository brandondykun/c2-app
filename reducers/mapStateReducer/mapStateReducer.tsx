import { Coordinate, Point } from "../../types/types";

type MapState =
  | "IDLE"
  | "ADD_POINT"
  | "EDIT_POINT"
  | "VIEW_LAYERS"
  | "GET_COORDINATE"
  | "MEASURE_POINTS"
  | null;

export type ActiveMenu =
  | "ADD_POINT"
  | "POINT_DETAILS"
  | "VIEW_LAYERS"
  | "GET_COORDINATE_DETAILS"
  | "MEASURE_POINTS"
  | "MESSAGES"
  | "TEAM"
  | null;

export type MapReducerState = {
  activeMapState: MapState;
  selectedPoint: Point | null;
  tempCoordinate: Coordinate | null;
  activeMenu: ActiveMenu;
  activeMapStateText: string;
  measurePointOne: Coordinate | null;
  measurePointTwo: Coordinate | null;
  showCenterGrid: boolean;
  showCurrentGrid: boolean;
};

export type MapStateReducerAction =
  | { type: "ADD_POINT" }
  | { type: "EDIT_POINT" }
  | { type: "VIEW_LAYERS" }
  | { type: "IDLE" }
  | { type: "SELECT_POINT"; payload: Point }
  | { type: "UNSELECT_POINT" }
  | { type: "SET_TEMP_COORDINATE"; payload: Coordinate }
  | { type: "CLEAR_TEMP_COORDINATE" }
  | { type: "SET_ACTIVE_MENU"; payload: ActiveMenu }
  | { type: "SET_ACTIVE_MAP_STATE_TEXT"; payload: string }
  | { type: "SET_ACTIVE_MAP_STATE"; payload: MapState }
  | { type: "ADD_POINT_BUTTON_PRESS" }
  | { type: "ADD_POINT_MAP_PRESS"; payload: Coordinate }
  | { type: "EDIT_POINT_MAP_PRESS"; payload: Coordinate }
  | { type: "POINT_DETAILS_EDIT_PRESS" }
  | { type: "LAYERS_BUTTON_PRESS" }
  | { type: "CANCEL_ADD_POINT_FORM" }
  | { type: "CLOSE_POINT_DETAILS_MENU" }
  | { type: "GET_COORDINATE_PRESS" }
  | { type: "GET_COORDINATE_MAP_PRESS"; payload: Coordinate }
  | { type: "CLOSE_GET_COORDINATE_DETAILS_MENU" }
  | { type: "MEASURE_POINTS_PRESS" }
  | { type: "SET_MEASURE_POINT_ONE"; payload: Coordinate }
  | { type: "SET_MEASURE_POINT_TWO"; payload: Coordinate }
  | { type: "CANCEL_POINTS_MEASURE" }
  | { type: "TOGGLE_SHOW_CENTER_GRID_BUTTON" }
  | { type: "TOGGLE_SHOW_CURRENT_GRID" }
  | { type: "TOGGLE_MESSAGES" }
  | { type: "TOGGLE_TEAM_MENU" };

export const mapReducerInitialState = {
  activeMapState: null,
  selectedPoint: null,
  tempCoordinate: null,
  activeMenu: null,
  activeMapStateText: "",
  measurePointOne: null,
  measurePointTwo: null,
  showCenterGrid: false,
  showCurrentGrid: false,
};

export const mapStateReducer = (
  state: MapReducerState,
  action: MapStateReducerAction
): MapReducerState => {
  switch (action.type) {
    case "ADD_POINT": {
      if (state)
        return {
          ...state,
          activeMapState: "ADD_POINT",
          activeMapStateText: !state.tempCoordinate
            ? "Tap on map to add point."
            : "Tap on map to edit point.",
        };
    }
    case "EDIT_POINT": {
      return {
        ...state,
        activeMapState: "EDIT_POINT",
        activeMapStateText: "Tap on map to edit point.",
      };
    }
    case "VIEW_LAYERS": {
      return {
        ...state,
        activeMapState: "VIEW_LAYERS",
        activeMenu: "VIEW_LAYERS",
      };
    }
    case "SELECT_POINT": {
      return { ...state, selectedPoint: action.payload };
    }
    case "UNSELECT_POINT": {
      return { ...state, selectedPoint: null };
    }
    case "SET_TEMP_COORDINATE": {
      return { ...state, tempCoordinate: action.payload };
    }
    case "CLEAR_TEMP_COORDINATE": {
      return { ...state, tempCoordinate: null };
    }
    case "SET_ACTIVE_MENU": {
      return { ...state, activeMenu: action.payload };
    }
    case "SET_ACTIVE_MAP_STATE_TEXT": {
      return {
        ...state,
        activeMapStateText: action.payload,
      };
    }
    case "SET_ACTIVE_MAP_STATE": {
      return {
        ...state,
        activeMapState: action.payload,
      };
    }
    case "ADD_POINT_BUTTON_PRESS": {
      if (state.activeMapState === "ADD_POINT") {
        return {
          ...state,
          activeMapState: null,
          tempCoordinate: null,
          activeMenu: null,
          selectedPoint: null,
          activeMapStateText: "",
        };
      }
      return {
        ...state,
        activeMapState: "ADD_POINT",
        activeMapStateText: !state.tempCoordinate
          ? "Tap on map to add point."
          : "Tap on map to edit point.",
        activeMenu: null,
        selectedPoint: null,
      };
    }
    case "ADD_POINT_MAP_PRESS": {
      return {
        ...state,
        activeMapStateText: "Tap on map to edit point.",
        tempCoordinate: action.payload,
        activeMenu: "ADD_POINT",
      };
    }
    case "EDIT_POINT_MAP_PRESS": {
      return {
        ...state,
        activeMapStateText: "Tap on map to edit point.",
        tempCoordinate: action.payload,
      };
    }
    case "POINT_DETAILS_EDIT_PRESS": {
      return {
        ...state,
        activeMenu: "ADD_POINT",
        activeMapState: "EDIT_POINT",
        activeMapStateText: "Tap on map to edit point.",
      };
    }
    case "LAYERS_BUTTON_PRESS": {
      if (state.activeMapState === "VIEW_LAYERS") {
        return {
          ...state,
          activeMapState: null,
          activeMenu: null,
        };
      }
      return {
        ...state,
        activeMapState: "VIEW_LAYERS",
        activeMenu: "VIEW_LAYERS",
      };
    }
    case "CANCEL_ADD_POINT_FORM": {
      return {
        ...state,
        activeMapState: null,
        activeMenu: null,
        tempCoordinate: null,
        selectedPoint: null,
        activeMapStateText: "",
      };
    }
    case "CLOSE_POINT_DETAILS_MENU": {
      return {
        ...state,
        activeMenu: null,
        selectedPoint: null,
        activeMapState: null,
      };
    }
    case "GET_COORDINATE_PRESS": {
      if (state.activeMapState !== "GET_COORDINATE") {
        return {
          ...state,
          activeMapState: "GET_COORDINATE",
          activeMapStateText: "Tap on map to get coordinates.",
          activeMenu: null,
        };
      } else {
        return {
          ...state,
          activeMapState: null,
          activeMapStateText: "",
          tempCoordinate: null,
          activeMenu: null,
        };
      }
    }
    case "GET_COORDINATE_MAP_PRESS": {
      return {
        ...state,
        activeMapState: "GET_COORDINATE",
        activeMapStateText: "",
        tempCoordinate: action.payload,
        activeMenu: "GET_COORDINATE_DETAILS",
      };
    }
    case "CLOSE_GET_COORDINATE_DETAILS_MENU": {
      return {
        ...state,
        activeMapState: null,
        tempCoordinate: null,
        activeMenu: null,
      };
    }
    case "MEASURE_POINTS_PRESS": {
      if (state.activeMapState === "MEASURE_POINTS") {
        return {
          ...state,
          activeMapState: null,
          activeMenu: null,
          measurePointOne: null,
          measurePointTwo: null,
          activeMapStateText: "",
        };
      } else {
        return {
          ...state,
          activeMapState: "MEASURE_POINTS",
          activeMapStateText: "Tap on the map to add the first point.",
        };
      }
    }
    case "SET_MEASURE_POINT_ONE": {
      return {
        ...state,
        measurePointOne: action.payload,
        activeMapStateText: "Tap on the map to add the second point.",
      };
    }
    case "SET_MEASURE_POINT_TWO": {
      return {
        ...state,
        measurePointTwo: action.payload,
        activeMenu: "MEASURE_POINTS",
        activeMapStateText: "Tap on the map to edit the second point.",
      };
    }
    case "CANCEL_POINTS_MEASURE": {
      return {
        ...state,
        activeMapState: null,
        activeMenu: null,
        measurePointOne: null,
        measurePointTwo: null,
        activeMapStateText: "",
      };
    }
    case "TOGGLE_SHOW_CENTER_GRID_BUTTON": {
      return {
        ...state,
        showCenterGrid: !state.showCenterGrid,
      };
    }
    case "TOGGLE_TEAM_MENU": {
      if (state.activeMenu === "TEAM") {
        return {
          ...state,
          activeMenu: null,
        };
      }
      return {
        ...state,
        activeMenu: "TEAM",
      };
    }
    case "TOGGLE_MESSAGES": {
      if (state.activeMenu === "MESSAGES") {
        return {
          ...state,
          activeMenu: null,
        };
      }
      return {
        ...state,
        activeMenu: "MESSAGES",
      };
    }
    case "TOGGLE_SHOW_CURRENT_GRID": {
      return {
        ...state,
        showCurrentGrid: !state.showCurrentGrid,
      };
    }
    default: {
      return state;
    }
  }
};
