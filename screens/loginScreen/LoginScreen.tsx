import * as SecureStore from "expo-secure-store";
import { StyleSheet, View, Text } from "react-native";
import Input from "../../components/ui/input/Input";
import { useState } from "react";
import Button from "../../components/ui/button/Button";
import { COLORS } from "../../colors/colors";
import { getMyInfo, login } from "../../api/auth";
import { useAuthContext } from "../../context/authContext/AuthContext";
import useTypeSafeNavigation from "../../hooks/useTypeSafeNavigation/useTypeSafeNavigation";

const LoginScreen = () => {
  const navigation = useTypeSafeNavigation();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const { authenticate } = useAuthContext();

  const handleLogin = async () => {
    setUsernameError("");
    setPasswordError("");

    let hasErrors = false;

    if (!username) {
      setUsernameError("Please enter a username.");
      hasErrors = true;
    }

    if (!password) {
      setPasswordError("Please enter a password.");
      hasErrors = true;
    }

    if (hasErrors) return;
    setSubmitLoading(true);

    const { data, error } = await login(username, password);
    if (data && !error) {
      await SecureStore.setItemAsync("ACCESS_TOKEN", data.access);
      await SecureStore.setItemAsync("REFRESH_TOKEN", data.refresh);

      const { data: myInfoData, error: myInfoError } = await getMyInfo();

      if (myInfoData && !myInfoError) {
        authenticate(
          { id: myInfoData.id, email: myInfoData.email },
          myInfoData.profile
        );
        setSubmitLoading(false);
      } else {
        setError(myInfoError);
        setSubmitLoading(false);
      }
    } else {
      setError(error);
      setSubmitLoading(false);
    }
  };

  const onCreateAccountPress = () => {
    navigation.navigate("registerScreen");
  };

  return (
    <View style={s.root}>
      <Text style={s.header}>Log In</Text>
      <Input
        value={username}
        onChangeText={setUsername}
        label="Email"
        error={usernameError}
        autoCapitalize="none"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        label="Password"
        error={passwordError}
        autoCapitalize="none"
      />
      <Text style={s.errorText}>{error}</Text>
      <Button onPress={handleLogin} label="Log In" loading={submitLoading} />

      <Button onPress={onCreateAccountPress} label="Create Account" />
    </View>
  );
};

export default LoginScreen;

const s = StyleSheet.create({
  root: {
    padding: 18,
    gap: 20,
  },
  header: {
    color: COLORS.gray[300],
    fontSize: 24,
    textAlign: "center",
    textTransform: "uppercase",
  },
  errorText: {
    minHeight: 20,
    textAlign: "center",
    color: COLORS.red[600],
    paddingVertical: 12,
  },
});
