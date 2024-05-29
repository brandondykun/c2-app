import { SelectList, SelectListProps } from "react-native-dropdown-select-list";
import { COLORS } from "../../../colors/colors";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export type Option = { key: number | string; value: string; disabled: boolean };

type Props = {
  selected?: number | null;
  setSelected: (
    value: any
  ) => void | React.Dispatch<React.SetStateAction<number | string>>;
  data: Option[];
  label?: string;
  error?: string;
} & SelectListProps;

const DropdownSelect = ({
  selected,
  setSelected,
  data,
  label,
  error,
  ...rest
}: Props) => {
  return (
    <View style={s.root}>
      {label && <Text style={s.label}>{label}</Text>}
      <SelectList
        setSelected={setSelected}
        data={data}
        save="key"
        search={false}
        inputStyles={s.inputStyles}
        boxStyles={s.boxStyles}
        dropdownStyles={s.dropdownStyles}
        dropdownTextStyles={{ color: COLORS.gray[300], fontSize: 16 }}
        {...rest}
        arrowicon={
          <Ionicons name="chevron-down" size={20} color={COLORS.gray[400]} />
        }
      />
      <View style={s.errorContainer}>
        {error && (
          <MaterialIcons
            name="error-outline"
            size={16}
            color={COLORS.red[600]}
          />
        )}
        <Text style={s.error}>{error}</Text>
      </View>
    </View>
  );
};

export default DropdownSelect;

const s = StyleSheet.create({
  root: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: COLORS.gray[400],
    marginBottom: 2,
  },
  errorContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  error: {
    minHeight: 20,
    color: COLORS.red[600],
    fontSize: 16,
  },
  dropdownStyles: {
    borderColor: COLORS.gray[700],
  },
  boxStyles: {
    borderColor: COLORS.gray[600],
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputStyles: {
    color: COLORS.gray[300],
    fontSize: 18,
  },
});
