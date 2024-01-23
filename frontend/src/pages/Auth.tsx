import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
  validateRole,
  validateUsername,
} from "../utils/validateUser";
import { MyLogo } from "../utils/StyledComps";
import {
  Google as GoogleIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Work as WorkIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store";
import { sendSignInRequest, sendSignUpRequest } from "../store/authThunks";

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
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
    enteredValue: role,
    isInputValid: isRoleValid,
    errMsg: roleErrMsg,
    inputHasError: roleHasError,
    handleChange: handleRoleChange,
    handleBlur: handleRoleBlur,
    reset: resetRole,
  } = useInputState({ validator: validateRole });

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
    isFormValid = isFormValid && isUsernameValid && isRoleValid;
  }

  const handlePasswordVisibility = () =>
    setShowPassword((showPassword) => !showPassword);

  const clearForm = () => {
    !isLogin && resetUsername();
    !isLogin && resetRole();
    resetEmail();
    resetPassword();
  };

  const switchAuthMode = () => {
    clearForm();
    setIsLogin((isLogin) => !isLogin);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    !isLogin && handleUsernameBlur();
    !isLogin && handleRoleBlur();
    handleEmailBlur();
    handlePasswordBlur();

    if (!isFormValid) {
      console.log("Form is invalid");
      return;
    }

    if (isLogin) {
      dispatch(
        sendSignInRequest({
          email: email.trim(),
          password: password.trim(),
        })
      );
    } else {
      dispatch(
        sendSignUpRequest({
          username: username.trim(),
          email: email.trim(),
          role: role.trim(),
          password: password.trim(),
        })
      );
    }

    // clearForm();
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
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
          >
            Continue with Google
          </Button>
          <Divider sx={{ my: 4 }} />
          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              {!isLogin && (
                <TextField
                  size="small"
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  onBlur={handleUsernameBlur}
                  error={usernameHasError}
                  helperText={usernameHasError && usernameErrMsg}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <TextField
                size="small"
                label="Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                error={emailHasError}
                helperText={emailHasError && emailErrMsg}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              {!isLogin && (
                <FormControl size="small" error={roleHasError}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    label="Role"
                    value={role}
                    onChange={handleRoleChange}
                    onBlur={handleRoleBlur}
                    startAdornment={
                      <InputAdornment position="start">
                        <WorkIcon fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="Refugee" disableRipple>
                      Refugee
                    </MenuItem>
                    <MenuItem value="Volunteer" disableRipple>
                      Volunteer
                    </MenuItem>
                  </Select>
                  {roleHasError && (
                    <FormHelperText>{roleErrMsg}</FormHelperText>
                  )}
                </FormControl>
              )}
              <TextField
                size="small"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                error={passwordHasError}
                helperText={passwordHasError && passwordErrMsg}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility}>
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            {status !== "pending" && (
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
            )}
            {status === "pending" && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
              </Box>
            )}
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
