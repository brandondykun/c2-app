import { useState, useEffect } from "react";
import { View } from "react-native";
import Text from "../ui/text/Text";

const Time = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString("en-US", { hour12: false }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const split = time.split(", ");

  return (
    <View>
      <Text>{split[0]}</Text>
      <Text>{split[1]}</Text>
    </View>
  );
};

export default Time;
