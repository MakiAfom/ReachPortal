import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormEvent, useState } from "react";
import useInputState from "../hooks/useInputState";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validateUser";
import { MyLogo } from "../utils/StyledComps";

const MyGrid = styled(Grid)(({ theme }) => ({
  height: "100vh",
  backgroundColor: theme.palette.grey[100],
  justifyContent: "center",
  alignItems: "center",
  gap: "8rem",
}));

const MyPaper = styled(Paper)(() => ({
  padding: "2rem",
  width: "20rem",
}));

const WelcomeText = styled("div")(() => ({
  minHeight: "40vh",
  width: "24rem",
}));

export default function Auth(): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);

  const {
    enteredValue: username,
    isInputValid: isUsernameValid,
    errMsg: usernameErrMsg,
    inputHasError: usernameHasError,
    handleChange: handleUsernameChange,
    handleBlur: handleUsernameBlur,
    reset: resetUsername,
  } = useInputState({ validator: validateUsername });

  const {
    enteredValue: email,
    isInputValid: isEmailValid,
    errMsg: emailErrMsg,
    inputHasError: emailHasError,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    reset: resetEmail,
  } = useInputState({ validator: validateEmail });

  const {
    enteredValue: password,
    isInputValid: isPasswordValid,
    errMsg: passwordErrMsg,
    inputHasError: passwordHasError,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
    reset: resetPassword,
  } = useInputState({ validator: validatePassword });

  let isFormValid = isEmailValid && isPasswordValid;
  if (!isLogin) {
    isFormValid = isFormValid && isUsernameValid;
  }

  const clearForm = () => {
    !isLogin && resetUsername();
    resetEmail();
    resetPassword();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    !isLogin && handleUsernameBlur();
    handleEmailBlur();
    handlePasswordBlur();

    if (!isFormValid) {
      console.log("Form is invalid");
      return;
    }

    console.log(username, email, password);
    clearForm();
  };

  const switchAuthMode = () => {
    clearForm();
    setIsLogin((isLogin) => !isLogin);
  };

  return (
    <MyGrid container>
      <Grid item>
        <WelcomeText>
          <MyLogo sx={{ fontSize: "3rem" }}>Reach</MyLogo>
          <Typography sx={{ fontSize: "1.4rem" }}>
            Connect with refugees and volunteers around you on Reach
          </Typography>
        </WelcomeText>
      </Grid>
      <Grid item>
        <MyPaper elevation={5}>
          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              {!isLogin && (
                <TextField
                  size="small"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  onBlur={handleUsernameBlur}
                  error={usernameHasError}
                  helperText={usernameHasError && usernameErrMsg}
                />
              )}
              <TextField
                size="small"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                error={emailHasError}
                helperText={emailHasError && emailErrMsg}
              />
              <TextField
                size="small"
                type="password"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                error={passwordHasError}
                helperText={passwordHasError && passwordErrMsg}
              />
            </Stack>
            <Button
              size="small"
              type="submit"
              variant="contained"
              disabled={!isFormValid}
              sx={{ mt: 5 }}
              fullWidth
            >
              {isLogin ? "Sign in" : "Sign up"}
            </Button>
          </form>
          <Divider sx={{ my: 4 }} />
          <Button onClick={switchAuthMode} fullWidth>
            {isLogin ? "Create an account" : "Log in to account"}
          </Button>
        </MyPaper>
      </Grid>
    </MyGrid>
  );
}
