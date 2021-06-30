import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { RegisterRequest } from "../../types/login";
import { registerUser } from "../../features/authSlice";

function RegisterForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userData);

  const onSubmit = (registerRequest: RegisterRequest) =>
    dispatch(registerUser(registerRequest));

  return (
    <Grid container justify="center">
      <Paper style={{ position: "relative", zIndex: 0 }}>
        <Box p={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  inputRef={register({ required: true })}
                  error={errors.email}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Login"
                  name="login"
                  inputRef={register({ required: true })}
                  error={errors.login}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Hasło"
                  name="password"
                  type="password"
                  inputRef={register({ required: true })}
                  error={errors.password}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Zarejestruj
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default RegisterForm;
