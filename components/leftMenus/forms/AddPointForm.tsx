import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../ui/text/Text";
import Input from "../../ui/input/Input";

import DropdownSelect from "../../ui/dropdownSelect/DropdownSelect";
import Button from "../../ui/button/Button";
import { useMapState } from "../../../context/mapState/MapStateContext";
import { COLORS } from "../../../colors/colors";
import { createPoint, updatePoint } from "../../../api/points";
import { useActiveMission } from "../../../context/activeMissionContext/ActiveMissionContext";
import { NewPoint, PointType, Point } from "../../../types/types";
import { useMapGraphics } from "../../../context/mapGraphics/MapGraphicsContext";
import { LLtoMGRS } from "../../../utils/utils";
import Coordinate from "../../coordinate/Coordinate";
import CoordinateConverter from "../../coordinateConverter/CoordinateConverter";

const AddPointForm = () => {
  const { state, dispatch } = useMapState();
  const { activeMission, activeTeam } = useActiveMission();
  const { addPoint, editPoint } = useMapGraphics();

  const [text, setText] = useState(
    state.selectedPoint ? state.selectedPoint.label : ""
  );
  const [description, setDescription] = useState(
    state.selectedPoint ? state.selectedPoint.description : ""
  );

  const [type, setType] = useState<PointType>(
    state.selectedPoint ? state.selectedPoint.type : "NAVIGATION"
  );

  const [submitLoading, setSubmitLoading] = useState(false);

  const setSelectedType = (type: PointType | number) => {
    if (typeof type === "string") {
      setType(type);
    }
  };

  useEffect(() => {
    if (state.selectedPoint) {
      dispatch({
        type: "SET_TEMP_COORDINATE",
        payload: {
          latitude: state.selectedPoint.lat,
          longitude: state.selectedPoint.lng,
        },
      });
    }
  }, []);

  const typeOptions = [
    {
      key: "NAVIGATION",
      value: "Navigation",
      disabled: false,
    },
    {
      key: "ENEMY",
      value: "Enemy",
      disabled: false,
    },
    {
      key: "FRIENDLY",
      value: "Friendly",
      disabled: false,
    },
    {
      key: "NEUTRAL",
      value: "Neutral",
      disabled: false,
    },
    {
      key: "UNKNOWN",
      value: "Unknown",
      disabled: false,
    },
  ];

  const handleSubmit = async () => {
    setSubmitLoading(true);

    if (!state.tempCoordinate) return;
    if (!activeMission) return;
    if (!activeTeam) return;

    if (!state.selectedPoint) {
      // Create a new Point
      const newPointData = {
        type: type.toUpperCase(),
        label: text,
        description,
        lat: state.tempCoordinate.latitude,
        lng: state.tempCoordinate.longitude,
        mission: activeMission.id,
        team: activeTeam.id,
        mgrs: LLtoMGRS({
          latitude: state.tempCoordinate.latitude,
          longitude: state.tempCoordinate.longitude,
        }),
      } as NewPoint;

      const { error, data } = await createPoint(newPointData);

      if (data && !error) {
        addPoint(data);
        handleCancel();
      }
    } else {
      // Edit existing Point

      const updatedPointData = {
        type: type.toUpperCase(),
        label: text,
        description,
        lat: state.tempCoordinate.latitude,
        lng: state.tempCoordinate.longitude,
        mission: activeMission.id,
        team: activeTeam.id,
      } as Point;

      const { error, data } = await updatePoint(
        state.selectedPoint.id,
        updatedPointData
      );
      if (data && !error) {
        editPoint(data);
        handleCancel();
      }
    }
  };

  const handleCancel = () => {
    dispatch({ type: "CANCEL_ADD_POINT_FORM" });
  };

  const defaultOption = state.selectedPoint
    ? typeOptions.find((option) => option.key === state.selectedPoint?.type)
    : typeOptions[0];

  return (
    <View style={s.root}>
      <Text style={s.header}>
        {state.selectedPoint ? "Edit Point" : "Add Point"}
      </Text>
      <View style={s.coordContainer}>
        <Text style={s.coordLabel}>Lat:</Text>
        <Text style={s.coordinate}>{state.tempCoordinate?.latitude}</Text>
      </View>
      <View style={s.coordContainer}>
        <Text style={s.coordLabel}>Long:</Text>
        <Text style={s.coordinate}>{state.tempCoordinate?.longitude}</Text>
      </View>
      <View style={s.coordContainer}>
        <Text style={s.coordLabel}>MGRS:</Text>
        <CoordinateConverter
          style={s.coordinate}
          coordinate={{
            latitude: state.tempCoordinate?.latitude!,
            longitude: state.tempCoordinate?.longitude!,
          }}
        />
      </View>
      <Input value={text} onChangeText={setText} label="Name" />
      <Input
        value={description}
        onChangeText={setDescription}
        label="Description"
        multiline
      />
      <DropdownSelect
        label="Point Type"
        setSelected={setSelectedType}
        data={typeOptions}
        defaultOption={defaultOption}
        save="value"
      />
      <View style={s.buttons}>
        <Button
          onPress={handleSubmit}
          label={state.selectedPoint ? "Save" : "Add Point"}
          rootStyles={{ flex: 1 }}
          variant="accent"
        />
        <Button
          onPress={handleCancel}
          label="Cancel"
          rootStyles={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default AddPointForm;

const s = StyleSheet.create({
  root: {
    width: 300,
  },
  header: {
    fontSize: 18,
    marginBottom: 24,
    marginTop: 12,
    textTransform: "uppercase",
    color: COLORS.lime[500],
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  coordinate: {
    fontSize: 18,
    color: COLORS.gray[400],
  },
  coordLabel: {
    color: COLORS.gray[600],
  },
  coordContainer: {
    paddingBottom: 12,
  },
});
