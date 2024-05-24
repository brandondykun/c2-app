import { Point } from "../../types/types";
import Text from "../ui/text/Text";
import { truncateLLCoord } from "../../utils/utils";

type Props = {
  point: Point | null;
};
const Coordinate = ({ point }: Props) => {
  const displayType = "MGRS";

  if (!point) return null;

  if (displayType === "MGRS") {
    let gridZoneDesignator = point.mgrs.slice(0, 3);
    let squareIdentifier = point.mgrs.slice(3, 5);
    let easting = point.mgrs.slice(5, 10);
    let northing = point.mgrs.slice(10, 16);
    return (
      <Text>
        {gridZoneDesignator} {squareIdentifier} {easting} {northing}
      </Text>
    );
  }
  return (
    <Text>{`${truncateLLCoord(point.lat)}, ${truncateLLCoord(
      point.lng
    )}`}</Text>
  );
};

export default Coordinate;
