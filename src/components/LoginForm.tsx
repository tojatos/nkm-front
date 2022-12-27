import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { Login } from "../types/login";
import { authenticate } from "../features/authSlice";

function LoginForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userData);

  const onSubmit = ({ login, password }: Login) => {
    dispatch(authenticate({ login, password }));
  };

  return (
    <Grid container justify="center">
      <Paper style={{ position: "relative", zIndex: 0 }}>
        {/*<Backdrop*/}
        {/*  open={userData?.loginRequestState === LOGIN_REQUEST_STATES.AWAITING}*/}
        {/*  style={{ position: "absolute", zIndex: 1 }}*/}
        {/*>*/}
        {/*  <CircularProgress color="inherit" />*/}
        {/*</Backdrop>*/}

        <Box p={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Login"
                  name="login"
                  inputRef={register({ required: true })}
                  error={errors.login}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
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
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default LoginForm;
