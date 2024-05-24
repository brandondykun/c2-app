export type HelpModalVariants =
  | "MESSAGES"
  | "HELP"
  | "LAYERS"
  | "BACK"
  | "ADD_POINT"
  | "GET_COORDINATE"
  | "MEASURE_POINTS"
  | "SHOW_CENTER_GRID"
  | "TEAMS";

export type Tokens = {
  access: string;
  refresh: string;
};

export type AccessToken = {
  access: string;
};

export type User = {
  id: null | number;
  email: null | string;
};

export type Profile = {
  id: null | number;
  username: null | string;
  about: null | string;
  user: null | number;
};

export type UserProfile = {
  id: number;
  email: string;
  profile: {
    id: number;
    username: string;
    about: string;
    user: number;
  };
};

export type Team = {
  id: number;
  name: string;
  about: string;
  created_at: string;
  members: number[];
};

export type TeamDetailed = {
  id: number;
  name: string;
  about: string;
  created_at: string;
  members: Profile[];
};

export type Mission = {
  id: number;
  name: string;
  about: string;
  created_at: string;
  teams: Team[];
};

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type PointType =
  | "NAVIGATION"
  | "ENEMY"
  | "FRIENDLY"
  | "NEUTRAL"
  | "UNKNOWN";

export type NewPoint = {
  type: PointType;
  label: string;
  description: string;
  lat: number;
  lng: number;
  mission: number;
  team: number;
  mgrs: string;
};

export type Point = {
  id: number;
  type: PointType;
  label: string;
  description: string;
  lat: number;
  lng: number;
  created_by: number;
  created_at: string;
  mission: number;
  team: number;
  visible: boolean;
  mgrs: string;
};

export type BackendPoint = Omit<Point, "visible">;

export type MissionGraphics = {
  id: number;
  name: string;
  mission_points: BackendPoint[];
};
