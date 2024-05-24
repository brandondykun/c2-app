import * as SecureStore from "expo-secure-store";
import { StyleSheet, View, Text } from "react-native";
import Input from "../../components/ui/input/Input";
import { useState } from "react";
import Button from "../../components/ui/button/Button";
import { COLORS } from "../../colors/colors";
import { getMyInfo, login, registerUser } from "../../api/auth";
import { useAuthContext } from "../../context/authContext/AuthContext";
import useTypeSafeNavigation from "../../hooks/useTypeSafeNavigation/useTypeSafeNavigation";

const RegisterScreen = () => {
  const navigation = useTypeSafeNavigation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const [error, setError] = useState("");

  const { authenticate } = useAuthContext();

  const handleRegister = async () => {
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setEmailError("");

    let hasErrors = false;

    if (!email) {
      setEmailError("Please enter an email.");
      hasErrors = true;
    }

    if (!username) {
      setUsernameError("Please enter a username.");
      hasErrors = true;
    }

    if (!password) {
      setPasswordError("Please enter a password.");
      hasErrors = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm the password.");
      hasErrors = true;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      setConfirmPasswordError("Passwords do not match.");
      hasErrors = true;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    }

    if (hasErrors) return;

    setSubmitLoading(true);

    const { data, error } = await registerUser(email, password, username);
    if (data && !error) {
      const { data: loginData, error: loginError } = await login(
        email,
        password
      );
      if (loginData && !loginError) {
        await SecureStore.setItemAsync("ACCESS_TOKEN", loginData.access);
        await SecureStore.setItemAsync("REFRESH_TOKEN", loginData.refresh);
        authenticate({ id: data.id, email: data.email }, data.profile);
      } else {
        setError("There was an error logging you in automatically.");
      }
    } else {
      setError("There was an error creating your account.");
    }
    setSubmitLoading(false);
  };

  const handleLoginPress = () => {
    navigation.navigate("loginScreen");
  };

  return (
    <View style={s.root}>
      <Text style={s.header}>Create Account</Text>
      <Input
        value={email}
        onChangeText={setEmail}
        label="Email"
        error={emailError}
      />
      <Input
        value={username}
        onChangeText={setUsername}
        label="Username"
        error={usernameError}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        label="Password"
        error={passwordError}
      />

      <Input
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        label="Confirm Password"
        error={confirmPasswordError}
      />
      <Button onPress={handleRegister} label="Create Account" />
      <Button onPress={handleLoginPress} label="Log In" />
    </View>
  );
};

export default RegisterScreen;

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
});
